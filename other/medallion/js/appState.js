import { DataManager } from './dataManager.js';
import { UIManager } from './uiManager.js';
import { ContentManager } from './contentManager.js';

export class AppState {
    /**
     * Refreshes page elements to reflect current medallion progress.
     * If a slug ID is present in the URL, shows details for that medallion.
     * @param {boolean} isNew - Indicates if the current medallion was just discovered.
     * @returns {Promise<void>} Resolves when the display is finished updating.
     */
    static async updateMedallionDisplay(isNew = false) {
        try {
            console.log('Updating medallion display');
            const medallionMap = await DataManager.loadMedallionMap();
            const visitedMedallions = DataManager.getVisitedMedallions();
            console.log('Visited medallions:', visitedMedallions.length);
            const urlParams = new URLSearchParams(window.location.search);
            const currentSlugId = urlParams.get('id');

            if (currentSlugId) {
                const currentMedallion = DataManager.getMedallionBySlugId(medallionMap, currentSlugId);
                if (currentMedallion) {
                    const medallionDetails = document.getElementById('medallionDetails');
                    const resultDiv = document.getElementById('result');
                    if (isNew) {
                        resultDiv.innerHTML = `<p class="text-lg text-gray-600">You've discovered the <strong>${currentMedallion.animal} medallion!</strong> 🎉</p>`;
                    } else {
                        resultDiv.innerHTML = ``;
                    }
                    medallionDetails.innerHTML = `<div class="p-4 rounded-lg"><div class="flex flex-col items-center mb-4"><div class="relative w-48 h-48 mb-4"><div class="absolute inset-0 rounded-full border-4 border-yellow-500 shadow-lg"></div><img src="img/${currentMedallion.animal}.svg" alt="${currentMedallion.animal}" class="w-full h-full object-contain p-6" onerror="this.src='img/placeholder.svg'"></div><h3 class="text-lg font-semibold mb-2">${currentMedallion.animal}</h3></div></div>`;
                } else {
                    console.warn(`No medallion found for slug ${currentSlugId}`);
                }
            } else {
                console.log('No current medallion slug in URL');
            }

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

            const tableData = medallionMap.map(medallion => {
                let status, statusText, statusClass, animal, location;
                if (visitedMedallions.includes(medallion.slug)) {
                    status = '✅';
                    statusText = 'Discovered - Scanned and added to your collection';
                    statusClass = 'bg-green-100 text-green-800';
                    animal = medallion.animal;
                    location = medallion.location;
                } else if (availableSlugs.has(medallion.slug)) {
                    status = '🔍';
                    statusText = 'Available - Clues unlocked — but not scanned yet';
                    statusClass = 'bg-blue-100 text-blue-800';
                    animal = medallion.animal;
                    location = medallion.location;
                } else {
                    status = '⏳';
                    statusText = 'Locked - Coming soon — hidden until you unlock the trail';
                    statusClass = 'bg-gray-100 text-gray-500';
                    animal = '????';
                    location = '????';
                }
                return { status, statusText, statusClass, animal, location, slug: medallion.slug };
            });

            const stats = {
                total: medallionMap.length,
                discovered: visitedMedallions.length,
                available: DataManager.getAvailableMedallions(medallionMap).length,
                locked: DataManager.getLockedMedallions(medallionMap).length
            };

            UIManager.updateStatsDisplay(stats);
            console.log(`Stats - total:${stats.total} discovered:${stats.discovered} available:${stats.available} locked:${stats.locked}`);
            UIManager.initializeMedallionMap(medallionMap, visitedMedallions);
            UIManager.renderMedallionProgressBar(stats);
        } catch (error) {
            console.error('Error in updateMedallionDisplay:', error);
            const tableBody = document.getElementById('medallionTableBody');
            tableBody.innerHTML = `<tr><td colspan="3" class="px-4 py-2 border text-red-600 text-center">Error loading medallion data. Please try refreshing the page.</td></tr>`;
        }
    }
}
