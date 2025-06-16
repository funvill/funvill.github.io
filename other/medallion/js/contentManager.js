import { SETTINGS_PATHS } from './config.js';
import { DataManager } from './dataManager.js';

/**
 * Retrieve the globally loaded marked instance if available.
 * @returns {typeof marked|null} The marked object or null when missing.
 */
function getMarked() {
    const m = window.marked;
    if (!m) {
        console.error('Marked library is missing or failed to load.');
        return null;
    } else {
        return m;
    }
}

export class ContentManager {
    /**
     * Load and render markdown describing a specific animal.
     * @param {string} animalName - The animal slug to load.
     * @returns {Promise<void>}
     */
    static async loadAnimalMarkdown(animalName) {
        console.log('Loading markdown for', animalName);
        const animalInfoDiv = document.getElementById('animalInfo');
        if (!animalInfoDiv) {
            console.error('Animal info container not found');
            return;
        } else {
            console.log('Animal info container ready');
        }
        try {
            const response = await fetch(SETTINGS_PATHS.ANIMAL_MARKDOWN.replace('${animalName}', animalName));
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                console.log('Animal markdown retrieved');
            }
            const markdown = await response.text();
            const m = getMarked();
            const html = m ? m.parse(markdown) : markdown;
            animalInfoDiv.innerHTML = `<div class="bg-gray-50 p-6 rounded-lg"><div class="markdown-content">${html}</div></div>`;
        } catch (err) {
            console.error('Error loading animal markdown:', err);
            animalInfoDiv.innerHTML = `<div class="bg-red-50 p-6 rounded-lg"><h3 class="text-xl font-semibold text-red-700 mb-3">Error Loading Animal Information</h3><p class="text-red-600">Unable to load information for ${animalName}. The markdown file may not exist or there was an error loading it.</p></div>`;
        }
    }

    /**
     * Load story chapter markdown files based on discovered medallions
     * and inject them into the page.
     * @returns {Promise<void>}
     */
    static async loadStoryChapters() {
        console.log('Loading story chapters');
        const storyChaptersDiv = document.getElementById('storyChapters');
        if (!storyChaptersDiv) {
            console.error('storyChapters element not found');
            return;
        } else {
            console.log('Story chapters container ready');
        }
        const visitedMedallions = DataManager.getVisitedMedallions();
        try {
            const medallionMap = await DataManager.loadMedallionMap();
            let chaptersHTML = '';
            let chapterNumber = 1;

            try {
                console.log('Fetching first milestone chapter');
                const milestoneResponse = await fetch(SETTINGS_PATHS.STORY_FIRST_CHAPTER, { cache: 'no-store', headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' } });
                if (!milestoneResponse.ok) {
                    throw new Error('Main story chapter 1 is missing');
                } else {
                    console.log('Milestone chapter 1 fetched');
                }
                const milestoneMarkdown = await milestoneResponse.text();
                chaptersHTML += this.createChapterHTML(chapterNumber, 'Main Story Part 1', milestoneMarkdown);
                chapterNumber++;
            } catch (error) {
                console.error('Error loading first milestone chapter:', error);
                chaptersHTML += this.createChapterHTML(chapterNumber, 'Main Story Part 1', 'Welcome to the Medallion Hunt! Discover medallions to unlock more of the story.');
                chapterNumber++;
            }

            if (visitedMedallions.length > 0) {
                for (let i = 0; i < visitedMedallions.length; i++) {
                    const slugId = visitedMedallions[i];
                    const medallion = DataManager.getMedallionBySlugId(medallionMap, slugId);
                    if (medallion) {
                        try {
                            console.log('Fetching story for', medallion.animal);
                            const response = await fetch(SETTINGS_PATHS.STORY_ANIMAL_CHAPTER.replace('${animal}', medallion.animal), { cache: 'no-store', headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' } });
                            if (response.ok) {
                                const markdown = await response.text();
                                chaptersHTML += this.createChapterHTML(chapterNumber, medallion.animal, markdown);
                                chapterNumber++;
                                if ((i + 1) % 5 === 0) {
                                    const milestoneNumber = Math.floor((i + 1) / 5) + 1;
                                    try {
                                        console.log('Fetching milestone chapter', milestoneNumber);
                                        const milestoneResponse = await fetch(SETTINGS_PATHS.STORY_MILESTONE_CHAPTER.replace('${milestoneNumber}', milestoneNumber), { cache: 'no-store', headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' } });
                                        if (milestoneResponse.ok) {
                                            const milestoneMarkdown = await milestoneResponse.text();
                                            chaptersHTML += this.createChapterHTML(chapterNumber, `Main Story Part ${milestoneNumber}`, milestoneMarkdown);
                                            chapterNumber++;
                                        } else {
                                            console.warn(`Milestone chapter ${milestoneNumber} missing`);
                                        }
                                    } catch (err) {
                                        console.error(`Error loading milestone chapter ${milestoneNumber}:`, err);
                                    }
                                }
                            } else {
                                console.warn(`Story chapter for ${medallion.animal} not found`);
                            }
                        } catch (err) {
                            console.error(`Error loading story for ${medallion.animal}:`, err);
                        }
                    } else {
                        console.warn(`Visited medallion slug ${slugId} not found in map`);
                    }
                }
            } else {
                console.log('No visited medallions yet; skipping story chapters');
            }
            storyChaptersDiv.innerHTML = chaptersHTML;
            this.initializeChapterToggles();
            console.log(`Loaded ${chapterNumber - 1} story chapters`);
        } catch (error) {
            console.error('Error loading story chapters:', error);
            storyChaptersDiv.innerHTML = `<div class="bg-red-50 p-6 rounded-lg"><h3 class="text-xl font-semibold text-red-700 mb-3">Error Loading Story</h3><p class="text-red-600">Unable to load story chapters. Please try refreshing the page.</p></div>`;
        }
    }

    /**
     * Build the HTML for a single story chapter block.
     * @param {number} chapterNumber - Numeric chapter index.
     * @param {string} title - Chapter title text.
     * @param {string} content - Markdown content for the chapter.
     * @returns {string} Rendered HTML snippet.
     */
    static createChapterHTML(chapterNumber, title, content) {
        const isMilestone = title.startsWith('Main Story Part');
        const m = getMarked();
        const rendered = m ? m.parse(content) : content;
        return `<div class="story-chapter rounded-lg mb-2"><div class="chapter-header flex justify-between items-center p-2 cursor-pointer hover:bg-violet-100 ${isMilestone ? 'bg-violet-100' : ''}"><h3 class="text-xl font-bold">Chapter ${chapterNumber}: ${title}</h3><button class="toggle-chapter p-2 hover:bg-gray-200 rounded-full"><svg class="w-6 h-6 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button></div><div class="chapter-content p-4 hidden"><div class="markdown-content">${rendered}</div></div></div>`;
    }

    /**
     * Attach expand/collapse behavior to loaded story chapters.
     * @returns {void}
     */
    static initializeChapterToggles() {
        document.querySelectorAll('.story-chapter').forEach(chapter => {
            const header = chapter.querySelector('.chapter-header');
            const content = chapter.querySelector('.chapter-content');
            const toggleButton = chapter.querySelector('.toggle-chapter');
            const chevron = toggleButton.querySelector('svg');
            header.addEventListener('click', () => {
                const isHidden = content.classList.contains('hidden');
                content.classList.toggle('hidden');
                chevron.classList.toggle('rotate-180');
            });
        });
    }

    /**
     * Load the project information markdown and insert it into the DOM.
     * @returns {Promise<void>}
     */
    static async loadAboutProject() {
        console.log('Loading about project markdown');
        const projectInfoDiv = document.getElementById('projectInfo');
        if (!projectInfoDiv) {
            console.error('projectInfo element not found');
            return;
        } else {
            console.log('Project info container ready');
        }
        try {
            const response = await fetch(SETTINGS_PATHS.INFO_PROJECT);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                console.log('About project markdown fetched');
            }
            const markdown = await response.text();
            const m = getMarked();
            const html = m ? m.parse(markdown) : markdown;
            projectInfoDiv.innerHTML = html;
            console.log("Loaded about project info successfully");
        } catch (err) {
            console.error('Error loading about project:', err);
        }
    }

    /**
     * Load fallback animal information shown before any medallions are discovered.
     * @returns {Promise<void>}
     */
    static async loadDefaultAnimalInfo() {
        console.log('Loading default animal information');
        const animalInfoDiv = document.getElementById('animalInfo');
        if (!animalInfoDiv) {
            console.error('animalInfo element not found');
            return;
        } else {
            console.log('Animal info container ready for default content');
        }
        try {
            const response = await fetch(SETTINGS_PATHS.ABOUT_ANIMALS);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                console.log('Default animal markdown fetched');
            }
            const markdown = await response.text();
            const m = getMarked();
            const html = m ? m.parse(markdown) : markdown;
            animalInfoDiv.innerHTML = `<div class="flex flex-col"><div class="p-4 rounded-lg">${html}</div></div>`;
            console.log("Loaded default animal info successfully");
        } catch (err) {
            console.error('Error loading default animal info:', err);
            animalInfoDiv.innerHTML = `<div class="bg-red-50 p-6 rounded-lg"><h3 class="text-xl font-semibold text-red-700 mb-3">Error Loading Animal Information</h3><p class="text-red-600">Unable to load default animal information. The markdown file may not exist or there was an error loading it.</p></div>`;
        }
    }
}
