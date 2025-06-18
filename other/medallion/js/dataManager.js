import { STORAGE_KEYS, SETTINGS_PATHS } from './config.js';

// Generate an RFC4122 version 4 UUID. Uses browser crypto if available
// and falls back to Math.random when crypto is not present.
function generateUUID() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
        return window.crypto.randomUUID();
    }
    const bytes = new Uint8Array(16);
    if (window.crypto && typeof window.crypto.getRandomValues === 'function') {
        window.crypto.getRandomValues(bytes);
    } else {
        for (let i = 0; i < bytes.length; i++) {
            bytes[i] = Math.floor(Math.random() * 256);
        }
    }
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = [...bytes].map(b => b.toString(16).padStart(2, '0')).join('');
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}


export class DataManager {
    /**
     * Retrieve the medallion map JSON from the server.
     * @returns {Promise<Array>} Array of medallion entries.
     */
    static async loadMedallionMap() {
        try {
            console.log('Fetching medallion map from', SETTINGS_PATHS.MEDALLION_MAP);
            const response = await fetch(SETTINGS_PATHS.MEDALLION_MAP);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                console.log('Medallion map request succeeded');
            }
            const data = await response.json();
            console.log('Medallion map loaded:', data.length, 'entries');
            return data;
        } catch (err) {
            console.error('Failed to load medallion map:', err);
            throw err;
        }
    }

    /**
     * Find a medallion entry within the provided map by its slug.
     * @param {Array} medallionMap - List of medallion objects.
     * @param {string} slugId - Slug identifier to search for.
     * @returns {Object|null} Matched medallion or null if not found.
     */
    static getMedallionBySlugId(medallionMap, slugId) {
        if (!Array.isArray(medallionMap)) {
            console.error('Invalid medallion map data:', medallionMap);
            return null;
        } else {
            return medallionMap.find(item => item.slug === slugId);
        }
    }

    /**
     * Filter the medallion map to only those the user has visited.
     * @param {Array} medallionMap - List of all medallions.
     * @returns {Array} Discovered medallions.
     */
    static getDiscoveredMedallions(medallionMap) {
        const visitedSlugs = this.getVisitedMedallions();
        return medallionMap.filter(m => visitedSlugs.includes(m.slug));
    }

    /**
     * Compute medallions that can be searched for based on discovered ones.
     * @param {Array} medallionMap - List of all medallions.
     * @returns {Array} Medallions that are now available to find.
     */
    static getAvailableMedallions(medallionMap) {
        const discovered = this.getDiscoveredMedallions(medallionMap);
        const availableSlugs = new Set();
        discovered.forEach(medallion => {
            if (medallion.NextA) {
                availableSlugs.add(medallion.NextA);
            } else {
                console.warn(`Medallion ${medallion.slug} missing NextA`);
            }
            if (medallion.NextB) {
                availableSlugs.add(medallion.NextB);
            } else {
                console.warn(`Medallion ${medallion.slug} missing NextB`);
            }
            if (medallion.NextC) {
                availableSlugs.add(medallion.NextC);
            } else {
                console.warn(`Medallion ${medallion.slug} missing NextC`);
            }
        });
        return medallionMap.filter(m => !this.getVisitedMedallions().includes(m.slug) && availableSlugs.has(m.slug));
    }

    /**
     * Determine which medallions remain locked.
     * @param {Array} medallionMap - List of all medallions.
     * @returns {Array} Locked medallion objects.
     */
    static getLockedMedallions(medallionMap) {
        const discoveredSlugs = new Set(this.getDiscoveredMedallions(medallionMap).map(m => m.slug));
        const availableSlugs = new Set(this.getAvailableMedallions(medallionMap).map(m => m.slug));
        return medallionMap.filter(m => !discoveredSlugs.has(m.slug) && !availableSlugs.has(m.slug));
    }

    /**
     * Retrieve the list of slug IDs stored in localStorage representing visited medallions.
     * @returns {Array} Array of slug IDs.
     */
    static getVisitedMedallions() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.VISITED_MEDALLIONS) || '[]');
        } catch (err) {
            console.error('Error parsing visited medallions from storage:', err);
            return [];
        }
    }

    /**
     * Mark a medallion as visited in localStorage.
     * @param {string} slugId - The slug to add.
     * @returns {boolean} True if the slug was newly added.
     */
    static addVisitedMedallion(slugId, animalName = '') {
        const visited = this.getVisitedMedallions();
        const isNew = !visited.includes(slugId);
        if (isNew) {
            visited.push(slugId);
            localStorage.setItem(STORAGE_KEYS.VISITED_MEDALLIONS, JSON.stringify(visited));
            console.log('Added new visited medallion', slugId);
            if (animalName && typeof gtag === 'function') {
                gtag('event', `Scanned ${animalName}`);
            }
        } else {
            console.log('Medallion already recorded', slugId);
        }
        return isNew;
    }

    /**
     * Clear local storage data related to progress and reload the page.
     * @returns {void}
     */
    static resetStorage() {
        console.warn('Resetting local storage');
        localStorage.removeItem(STORAGE_KEYS.VISITED_MEDALLIONS);
        localStorage.removeItem(STORAGE_KEYS.SECTION_STATES);
        localStorage.removeItem(STORAGE_KEYS.USER_ID);
        window.history.replaceState({}, document.title, window.location.pathname);
        window.location.reload();
    }



    static getUserID() {
        let userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
        if (!userId) {
            userId = generateUUID();
            localStorage.setItem(STORAGE_KEYS.USER_ID, userId);
            console.log('Generated user_id:', userId);
        } else {
            console.log('Existing user_id:', userId);
        }
        return userId;
    }

    /**
     * Fetch a specific story chapter markdown file.
     * @param {string} chapterId - Chapter identifier.
     * @returns {Promise<string>} Markdown content.
     */
    static async fetchStoryChapter(chapterId) {
        console.log('Fetching story chapter', chapterId);
        const response = await fetch(SETTINGS_PATHS.STORY_CHAPTER.replace('${chapterId}', chapterId));
        if (!response.ok) {
            throw new Error(`Failed to fetch story chapter: ${chapterId}`);
        } else {
            console.log('Story chapter fetched');
        }
        return await response.text();
    }

    /**
     * Fetch detailed info for an animal.
     * @param {string} animalId - Animal identifier.
     * @returns {Promise<string>} Markdown content.
     */
    static async fetchAnimalInfo(animalId) {
        console.log('Fetching animal info', animalId);
        const response = await fetch(SETTINGS_PATHS.ANIMAL_INFO.replace('${animalId}', animalId));
        if (!response.ok) {
            throw new Error(`Failed to fetch animal info: ${animalId}`);
        } else {
            console.log('Animal info fetched');
        }
        return await response.text();
    }

    /**
     * Attempt to parse a coordinate string into lat/lng numeric values.
     * @param {string} location - String representation of coordinates.
     * @returns {Object|null} {lat, lng} pair or null if parsing fails.
     */
    static convertLocationToCoordinates(location) {
        if (!location || location === '????') {
            console.warn('Location empty or placeholder');
            return null;
        } else {
            const latLngMatch = location.match(/^\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*$/);
            if (latLngMatch) {
                return { lat: parseFloat(latLngMatch[1]), lng: parseFloat(latLngMatch[2]) };
            } else {
                const spaceMatch = location.match(/^\s*([-+]?\d*\.?\d+)\s+([-+]?\d*\.?\d+)\s*$/);
                if (spaceMatch) {
                    return { lat: parseFloat(spaceMatch[1]), lng: parseFloat(spaceMatch[2]) };
                } else {
                    const degreeMatch = location.match(/^\s*([-+]?\d*\.?\d+)°\s+([-+]?\d*\.?\d+)°\s*$/);
                    if (degreeMatch) {
                        return { lat: parseFloat(degreeMatch[1]), lng: parseFloat(degreeMatch[2]) };
                    } else {
                        const cardinalMatch = location.match(/^\s*([-+]?\d*\.?\d+)°([NS])\s+([-+]?\d*\.?\d+)°([EW])\s*$/);
                        if (cardinalMatch) {
                            const lat = parseFloat(cardinalMatch[1]) * (cardinalMatch[2] === 'N' ? 1 : -1);
                            const lng = parseFloat(cardinalMatch[3]) * (cardinalMatch[4] === 'E' ? 1 : -1);
                            return { lat, lng };
                        } else {
                            console.warn('Could not parse coordinates from', location);
                            return null;
                        }
                    }
                }
            }
        }
    }
}
