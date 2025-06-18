import { STORAGE_KEYS, SETTINGS_DEVELOPER } from './config.js';
import { DataManager } from './dataManager.js';

export class UIManager {
    /**
     * Set up collapsible UI sections with saved state from localStorage.
     * @returns {void}
     */
    static initializeCollapsibleSections() {
        console.log('Initializing collapsible sections');
        const diagnosticSection = document.querySelector('[data-section="diagnostic"]');
        if (diagnosticSection) {
            diagnosticSection.style.display = SETTINGS_DEVELOPER ? 'block' : 'none';
        } else {
            console.warn('Diagnostic section not found');
        }

        const sections = document.querySelectorAll('.collapsible-section');
        const savedStates = JSON.parse(localStorage.getItem(STORAGE_KEYS.SECTION_STATES) || '{}');

        sections.forEach(section => {
            const sectionId = section.dataset.section;
            const header = section.querySelector('.section-header');
            const content = section.querySelector('.section-content');
            const toggleButton = section.querySelector('.toggle-section');
            const chevron = toggleButton.querySelector('svg');

            const isCollapsed = savedStates[sectionId] || false;
            if (isCollapsed) {
                content.style.display = 'none';
                chevron.classList.add('rotate-180');
            } else {
                console.log(`Section ${sectionId} initially expanded`);
            }

            header.addEventListener('click', () => {
                const isCurrentlyCollapsed = content.style.display === 'none';
                content.style.display = isCurrentlyCollapsed ? 'block' : 'none';
                chevron.classList.toggle('rotate-180');

                savedStates[sectionId] = !isCurrentlyCollapsed;
                localStorage.setItem(STORAGE_KEYS.SECTION_STATES, JSON.stringify(savedStates));

                if (sectionId === 'medallion-map' && isCurrentlyCollapsed && window.medallionMap) {
                    setTimeout(() => {
                        window.medallionMap.invalidateSize();
                    }, 100);
                } else {
                    console.log(`Section ${sectionId} toggled`);
                }
            });
        });
    }

    /**
     * Configure the mobile navigation menu and scrolling behavior.
     * @returns {void}
     */
    static initializeNavigationMenu() {
        console.log('Initializing navigation menu');
        const menuButton = document.getElementById('menuButton');
        const closeMenu = document.getElementById('closeMenu');
        const navMenu = document.getElementById('navMenu');
        const menuLinks = navMenu.querySelectorAll('a');

        menuButton.addEventListener('click', () => {
            navMenu.classList.remove('hidden');
            setTimeout(() => {
                navMenu.querySelector('div').classList.remove('-translate-x-full');
            }, 10);
        });

        closeMenu.addEventListener('click', () => {
            navMenu.querySelector('div').classList.add('-translate-x-full');
            setTimeout(() => {
                navMenu.classList.add('hidden');
            }, 300);
        });

        menuLinks.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    navMenu.querySelector('div').classList.add('-translate-x-full');
                    setTimeout(() => {
                        navMenu.classList.add('hidden');
                    }, 300);

                    targetSection.scrollIntoView({ behavior: 'smooth' });

                    const content = targetSection.querySelector('.section-content');
                    const chevron = targetSection.querySelector('.toggle-section svg');

                    if (content.style.display === 'none') {
                        content.style.display = 'block';
                        chevron.classList.remove('rotate-180');
                        const savedStates = JSON.parse(localStorage.getItem(STORAGE_KEYS.SECTION_STATES) || '{}');
                        savedStates[targetSection.dataset.section] = false;
                        localStorage.setItem(STORAGE_KEYS.SECTION_STATES, JSON.stringify(savedStates));
                    } else {
                        console.log(`Section ${targetId} already expanded`);
                    }
                } else {
                    console.warn(`Target section ${targetId} not found`);
                }
            });
        });

        navMenu.addEventListener('click', e => {
            if (e.target === navMenu) {
                navMenu.querySelector('div').classList.add('-translate-x-full');
                setTimeout(() => {
                    navMenu.classList.add('hidden');
                }, 300);
            } else {
                console.log('Navigation menu click ignored');
            }
        });
    }

    /**
     * Render the numeric medallion statistics in the summary panel.
     * @param {Object} stats - Stats object containing totals.
     * @returns {void}
     */
    static updateStatsDisplay(stats) {
        const statsDiv = document.getElementById('stats');
        statsDiv.innerHTML = `
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-gray-50 p-4 rounded-lg text-center">
                    <p class="text-sm text-gray-600">Total Medallions</p>
                    <p class="text-2xl font-bold">${stats.total}</p>
                </div>
                <div class="bg-green-50 p-4 rounded-lg text-center">
                    <p class="text-sm text-green-600">Discovered</p>
                    <p class="text-2xl font-bold text-green-600">${stats.discovered}</p>
                </div>
                <div class="bg-blue-50 p-4 rounded-lg text-center">
                    <p class="text-sm text-blue-600">Available</p>
                    <p class="text-2xl font-bold text-blue-600">${stats.available}</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg text-center">
                    <p class="text-sm text-gray-600">Locked </p>
                    <p class="text-2xl font-bold">${stats.locked}</p>
                </div>
            </div>`;
    }

    /**
     * Update the progress bar showing discovered/available ratios.
     * @param {Object} stats - Stats object containing totals.
     * @returns {void}
     */
    static renderMedallionProgressBar(stats) {
        const bar = document.getElementById('medallion-progress-bar');
        if (!bar) {
            console.warn('Progress bar element missing');
            return;
        } else {
            console.log('Rendering progress bar');
        }
        const { discovered, available, locked, total } = stats;
        const discoveredPct = total ? (discovered / total) * 100 : 0;
        const availablePct = total ? (available / total) * 100 : 0;
        const lockedPct = total ? (total - (discovered + available)) / total * 100 : 0;
        const titleMouseOver = `Discovered: ${discovered}, Available: ${available}, Locked: ${locked}, Total: ${total}`;

        bar.innerHTML = `
            <div class="h-full bg-green-500" style="width: ${discoveredPct}%; transition: width 0.5s;" title="${titleMouseOver}"></div>
            <div class="h-full bg-blue-500" style="width: ${availablePct}%; transition: width 0.5s;" title="${titleMouseOver}"></div>
            <div class="h-full bg-gray-300" style="width: ${lockedPct}%; transition: width 0.5s;" title="${titleMouseOver}"></div>`;
    }

    /**
     * Show diagnostic information when developer mode is enabled.
     * @returns {void}
     */
    static updateDiagnosticDisplay() {
        if (!SETTINGS_DEVELOPER) {
            console.warn('Developer diagnostics disabled');
            return;
        } else {
            console.log('Updating diagnostics');
        }
        const storageDisplay = document.getElementById('storageDisplay');
        const availableList = document.getElementById('availableList');

        if (storageDisplay) {
            const visitedMedallions = DataManager.getVisitedMedallions();
            storageDisplay.textContent = JSON.stringify(visitedMedallions, null, 2);
        } else {
            console.warn('storageDisplay element missing');
        }

        if (availableList) {
            DataManager.loadMedallionMap().then(medallionMap => {
                const visited = DataManager.getVisitedMedallions();
                const available = medallionMap.filter(m => !visited.includes(m.slug));
                availableList.innerHTML = available.map(m => `<a href="?id=${m.slug}" class="text-blue-600 hover:text-blue-800 hover:underline">${m.animal}</a>`).join('');
            }).catch(err => {
                console.error('Error updating available list:', err);
                availableList.innerHTML = '<p class="text-red-600">Error loading available medallions</p>';
            });
        } else {
            console.warn('availableList element missing');
        }
    }

    /**
     * Build the interactive Leaflet map and populate it with markers.
     * @param {Array} medallionMap - All medallion data.
     * @param {Array} visitedMedallions - Slugs already visited.
     * @returns {void}
     */
    static initializeMedallionMap(medallionMap, visitedMedallions) {
        console.log('Initializing Leaflet map');
        if (!window.L) {
            console.error('Leaflet library is not loaded.');
            return;
        } else {
            console.log('Leaflet present');
        }
        if (typeof L.markerClusterGroup !== 'function') {
            console.error('Leaflet.markercluster plugin is missing.');
            return;
        } else {
            console.log('MarkerCluster plugin present');
        }

        try {
        let mapContainer = document.getElementById('medallionMap');
        if (!mapContainer) {
            const mapSection = document.querySelector('#medallion-map .section-content');
            if (!mapSection) {
                console.warn('Map section element not found');
                return;
            } else {
                console.log('Creating map container');
            }

            const wrapper = document.createElement('div');
            wrapper.className = 'relative';

            mapContainer = document.createElement('div');
            mapContainer.id = 'medallionMap';
            mapContainer.className = 'h-[300px] sm:h-[400px] md:h-[500px] rounded-lg';

            const fullscreenButton = document.createElement('button');
            fullscreenButton.id = 'fullscreenButton';
            fullscreenButton.className = 'absolute top-2 right-2 bg-white p-2 rounded-lg shadow-md hover:bg-red-100 focus:outline-none z-[1000]';
            fullscreenButton.innerHTML = `
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"></path>
                </svg>`;

            wrapper.appendChild(mapContainer);
            wrapper.appendChild(fullscreenButton);

            const legend = document.createElement('div');
            legend.className = 'mt-4 flex items-center justify-center space-x-4';
            legend.innerHTML = `
                <div class="flex items-center">
                    <div class="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                    <span>Discovered</span>
                </div>
                <div class="flex items-center">
                    <div class="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                    <span>Available</span>
                </div>`;

            mapSection.innerHTML = '';
            mapSection.appendChild(wrapper);
            mapSection.appendChild(legend);
        }

        if (window.medallionMap) {
            window.medallionMap.remove();
            window.medallionMap = null;
        } else {
            console.log('Creating new map instance');
        }

        window.medallionMap = L.map('medallionMap', {
            zoomControl: false,
            minZoom: 4,
            maxZoom: 18
        }).setView([54.5, -125.5], 6);

        L.control.zoom({ position: 'topleft' }).addTo(window.medallionMap);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(window.medallionMap);

        const fullscreenButton = document.getElementById('fullscreenButton');
        const mapSection = mapContainer.closest('.section-content');
        let isFullscreen = false;

        fullscreenButton.addEventListener('click', () => {
            if (!isFullscreen) {
                mapSection.style.position = 'fixed';
                mapSection.style.top = '0';
                mapSection.style.left = '0';
                mapSection.style.right = '0';
                mapSection.style.bottom = '0';
                mapSection.style.zIndex = '9999';
                mapSection.style.backgroundColor = 'white';
                mapSection.style.padding = '1rem';
                mapContainer.style.height = 'calc(100vh - 2rem)';
                fullscreenButton.innerHTML = `
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>`;
            } else {
                mapSection.style.position = '';
                mapSection.style.top = '';
                mapSection.style.left = '';
                mapSection.style.right = '';
                mapSection.style.bottom = '';
                mapSection.style.zIndex = '';
                mapSection.style.backgroundColor = '';
                mapSection.style.padding = '';
                mapContainer.style.height = '';
                fullscreenButton.innerHTML = `
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"></path>
                    </svg>`;
            }
            isFullscreen = !isFullscreen;
            window.medallionMap.invalidateSize();
        });

        const discoveredCluster = L.markerClusterGroup({
            iconCreateFunction: cluster => L.divIcon({
                html: `<div class="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">${cluster.getChildCount()}</div>`,
                className: 'custom-cluster',
                iconSize: L.point(32, 32)
            }),
            maxClusterRadius: 50,
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true,
            disableClusteringAtZoom: 15
        });

        const availableCluster = L.markerClusterGroup({
            iconCreateFunction: cluster => L.divIcon({
                html: `<div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">${cluster.getChildCount()}</div>`,
                className: 'custom-cluster',
                iconSize: L.point(32, 32)
            }),
            maxClusterRadius: 50,
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true,
            disableClusteringAtZoom: 15
        });

        const availableSlugs = new Set();
        visitedMedallions.forEach(slugId => {
            const medallion = DataManager.getMedallionBySlugId(medallionMap, slugId);
            if (medallion) {
                if (medallion.NextA) {
                    availableSlugs.add(medallion.NextA);
                } else {
                    console.warn(`Medallion ${slugId} missing NextA`);
                }
                if (medallion.NextB) {
                    availableSlugs.add(medallion.NextB);
                } else {
                    console.warn(`Medallion ${slugId} missing NextB`);
                }
                if (medallion.NextC) {
                    availableSlugs.add(medallion.NextC);
                } else {
                    console.warn(`Medallion ${slugId} missing NextC`);
                }
            } else {
                console.warn(`Visited slug ${slugId} not found in map`);
            }
        });

        medallionMap.forEach(medallion => {
            const coords = DataManager.convertLocationToCoordinates(medallion.location);
            if (!coords) {
                console.warn('Invalid coordinates for', medallion.slug);
                return;
            } else {
                // continue
            }
            if ((visitedMedallions.length > 0 || availableSlugs.size > 0) &&
                !visitedMedallions.includes(medallion.slug) &&
                !availableSlugs.has(medallion.slug)) {
                return;
            }

            const circle = L.circle([coords.lat, coords.lng], {
                radius: 30,
                color: visitedMedallions.includes(medallion.slug) ? '#22c55e' : '#3b82f6',
                fillColor: visitedMedallions.includes(medallion.slug) ? '#22c55e' : '#3b82f6',
                fillOpacity: 0.5,
                weight: 3
            });

            const popupContent = visitedMedallions.includes(medallion.slug)
                ? `<div class="p-2"><h3 class="font-bold mb-1">${medallion.animal}</h3><p class="text-sm text-green-600 mb-2">✅ Discovered</p><p class="text-sm mb-2">Location: ${medallion.location}</p><a href="?id=${medallion.slug}" class="text-green-600 hover:text-green-700 hover:underline text-sm">View Medallion Details →</a></div>`
                : `<div class="p-2"><h3 class="font-bold mb-1">Available Medallion</h3><p class="text-sm text-blue-600 mb-2">🔍 Available to Find</p><p class="text-sm text-gray-600">Search within 20 meters of this location to find the hidden medallion.</p></div>`;
            circle.bindPopup(popupContent);

            if (visitedMedallions.includes(medallion.slug)) {
                discoveredCluster.addLayer(circle);
            } else {
                availableCluster.addLayer(circle);
            }
        });

        window.medallionMap.addLayer(discoveredCluster);
        window.medallionMap.addLayer(availableCluster);
        console.log(`Map markers: discovered ${discoveredCluster.getLayers().length}, available ${availableCluster.getLayers().length}`);

        const bounds = L.latLngBounds(medallionMap
            .map(m => DataManager.convertLocationToCoordinates(m.location))
            .filter(coords => coords !== null)
            .map(coords => [coords.lat, coords.lng]));

        if (bounds.isValid()) {
            window.medallionMap.fitBounds(bounds, { padding: [50, 50] });
            console.log("Map initialized and centered on bounds");
        } else {
            console.warn("Map bounds invalid");
        }
        } catch (err) {
            console.error('Failed to initialize medallion map:', err);
        }
    }
}
