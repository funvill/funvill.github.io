import { UIManager } from './uiManager.js';
import { DataManager } from './dataManager.js';
import { ContentManager } from './contentManager.js';
import { AppState } from './appState.js';

// Access the marked library loaded globally via script tag
const marked = window.marked;

if (!marked) {
    console.error('Marked library is missing or failed to load.');
} else {
    // Configure marked for markdown parsing
    marked.setOptions({
        breaks: true,
        gfm: true,
        headerIds: true,
        mangle: false,
        sanitize: false
    });
}

// Main initialization handler executed once the DOM is fully loaded.
// Sets up UI components, loads data sources and markdown content,
// and initializes the interactive map. Returns nothing.
document.addEventListener('DOMContentLoaded', async () => {
    try {
        console.log('Initializing Medallion Hunt');

        console.log('Checking for required libraries');
        if (!window.L) {
            console.error('Leaflet library is missing or failed to load.');
        } else {
            console.log('Leaflet library loaded successfully');
        }
        console.log('Setting up UI...');
        UIManager.initializeCollapsibleSections();
        UIManager.initializeNavigationMenu();
        console.log("Looking for reset button");

        const resetButton = document.getElementById('resetStorage');
        if (!resetButton) {
            console.warn('Reset button not found in DOM');
        } else {
            resetButton.addEventListener('click', () => {
                if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
                    DataManager.resetStorage();
                } else {
                    console.log('Reset action cancelled');
                }
            });
        }

        console.log('Loading medallion map...');
        const medallionMap = await DataManager.loadMedallionMap();
        DataManager.getUserID();

        console.log('Initializing map UI');
        UIManager.initializeMedallionMap(medallionMap, DataManager.getVisitedMedallions());

        console.log('Updating medallion display');
        await AppState.updateMedallionDisplay();
        console.log('Loading story chapters');
        await ContentManager.loadStoryChapters();
        console.log('Loading project info');
        await ContentManager.loadAboutProject();
        console.log('Loading default animal info');
        await ContentManager.loadDefaultAnimalInfo();
        UIManager.updateDiagnosticDisplay();
        console.log("Diagnostics updated");

        const urlParams = new URLSearchParams(window.location.search);
        const currentSlugId = urlParams.get('id');
        console.log(`URL parameter id: ${currentSlugId}`);
        if (currentSlugId) {
            const currentMedallion = DataManager.getMedallionBySlugId(medallionMap, currentSlugId);
            if (currentMedallion) {
                const isNew = DataManager.addVisitedMedallion(currentSlugId, currentMedallion.animal);
                await AppState.updateMedallionDisplay(isNew);
                await ContentManager.loadAnimalMarkdown(currentMedallion.animal);
                if (isNew) {
                    await ContentManager.loadStoryChapters();
                } else {
                    console.log('Medallion already discovered previously');
                }
                UIManager.updateDiagnosticDisplay();
            } else {
                console.warn(`Medallion with slug ${currentSlugId} not found`);
            }
        } else {
            console.log('No medallion slug provided in URL');
        }

        const foundMedallionList = document.getElementById('found-medallion-list');
        const foundMedallionList2 = document.getElementById('found-medallion-list2');
        if (foundMedallionList && foundMedallionList2) {
            const visitedMedallions = DataManager.getVisitedMedallions();
            // Color palette for animal tags
            const animalColors = [
                'bg-red-200', 'bg-orange-200', 'bg-yellow-200', 'bg-green-200', 'bg-teal-200',
                'bg-blue-200', 'bg-indigo-200', 'bg-purple-200', 'bg-pink-200', 'bg-rose-200',
                'bg-lime-200', 'bg-emerald-200', 'bg-cyan-200', 'bg-fuchsia-200', 'bg-violet-200',
                'bg-sky-200', 'bg-amber-200', 'bg-stone-200', 'bg-zinc-200'
            ];
            // Assign a color based on animal name hash
            function getAnimalColor(animal) {
                let hash = 0;
                for (let i = 0; i < animal.length; i++) {
                    hash = animal.charCodeAt(i) + ((hash << 5) - hash);
                }
                return animalColors[Math.abs(hash) % animalColors.length];
            }
            const found = visitedMedallions.map(slug => {
                const medallion = medallionMap.find(m => m.slug === slug);
                if (!medallion) return slug;
                const colorClass = getAnimalColor(medallion.animal);
                return `<a href="?id=${medallion.slug}" class="inline-block px-3 py-1 m-1 rounded border border-gray-400 ${colorClass} text-black font-semibold shadow hover:scale-105 transition-transform cursor-pointer" title="View details for ${medallion.animal}">${medallion.animal}</a>`;
            });
            console.log(`Displaying ${found.length} discovered medallions`);
            foundMedallionList.innerHTML = found.length > 0 ? found.join('') : '<span class="text-gray-400">None found yet</span>';
            foundMedallionList2.innerHTML = found.length > 0 ? found.join('') : '<span class="text-gray-400">None found yet</span>';
        } else {
            console.warn('Medallion list elements missing');
        }

        const availableMedallionList = document.getElementById('available-medallion-list');
        if (availableMedallionList) {
            const availableMedallions = DataManager.getAvailableMedallions(medallionMap);
            console.log(`Listing ${availableMedallions.length} available medallions`);
            // Use the same color palette and hash function as above
            const animalColors = [
                'bg-red-200', 'bg-orange-200', 'bg-yellow-200', 'bg-green-200', 'bg-teal-200',
                'bg-blue-200', 'bg-indigo-200', 'bg-purple-200', 'bg-pink-200', 'bg-rose-200',
                'bg-lime-200', 'bg-emerald-200', 'bg-cyan-200', 'bg-fuchsia-200', 'bg-violet-200',
                'bg-sky-200', 'bg-amber-200', 'bg-stone-200', 'bg-zinc-200'
            ];
            function getAnimalColor(animal) {
                let hash = 0;
                for (let i = 0; i < animal.length; i++) {
                    hash = animal.charCodeAt(i) + ((hash << 5) - hash);
                }
                return animalColors[Math.abs(hash) % animalColors.length];
            }
            let outputHTML = '';
            for (let i = 0; i < availableMedallions.length; i++) {
                const medallion = availableMedallions[i];
                const colorClass = getAnimalColor(medallion.animal);
                outputHTML += `<li class="mb-2">
                    <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(medallion.location)}" target="_blank"
                        class="inline-block px-3 py-1 font-mono rounded border border-gray-400 ${colorClass} text-black font-semibold shadow hover:scale-105 transition-transform cursor-pointer mr-2 mb-1"
                        title="Open location for ${medallion.animal}">
                        ${medallion.location}
                    </a>
                    <span class="text-gray-700">${medallion.clue}</span>
                </li>`;
            }
            availableMedallionList.innerHTML = '<ul class="list-none pl-0">' + outputHTML + '</ul>';
        } else {
            console.warn('Available medallion list element missing');
        }
    } catch (err) {
        console.error('Error during initialization:', err);
    }
});
