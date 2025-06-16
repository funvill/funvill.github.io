import { UIManager } from './uiManager.js';
import { DataManager } from './dataManager.js';
import { ContentManager } from './contentManager.js';
import { AppState } from './appState.js';
import './config.js';

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
                const isNew = DataManager.addVisitedMedallion(currentSlugId);
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
            const found = visitedMedallions.map(slug => {
                const medallion = medallionMap.find(m => m.slug === slug);
                return medallion ? `<a href="?id=${medallion.slug}" class="text-blue-600 hover:underline">${medallion.animal}</a>` : slug;
            });
            console.log(`Displaying ${found.length} discovered medallions`);
            foundMedallionList.innerHTML = found.length > 0 ? found.join(',') : '<span class="text-gray-400">None found yet</span>';
            foundMedallionList2.innerHTML = found.length > 0 ? found.join(', ') : '<span class="text-gray-400">None found yet</span>';
        } else {
            console.warn('Medallion list elements missing');
        }

        const availableMedallionList = document.getElementById('available-medallion-list');
        if (availableMedallionList) {
            const availableMedallions = DataManager.getAvailableMedallions(medallionMap);
            console.log(`Listing ${availableMedallions.length} available medallions`);
            let outputHTML = '';
            for (let i = 0; i < availableMedallions.length; i++) {
                outputHTML += `<li><a href="https://www.google.com/maps/search/?api=1&query=${availableMedallions[i].location}" target="_blank" class="text-blue-600 hover:text-blue-800 hover:underline">${availableMedallions[i].location}</a><br />${availableMedallions[i].clue}</li>`;
            }
            availableMedallionList.innerHTML = '<ul>' + outputHTML + '</ul>';
        } else {
            console.warn('Available medallion list element missing');
        }
    } catch (err) {
        console.error('Error during initialization:', err);
    }
});
