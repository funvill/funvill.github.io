export const STORAGE_KEYS = {
    VISITED_MEDALLIONS: 'visitedMedallions',
    SECTION_STATES: 'sectionStates',
    USER_ID: 'user_id'
};

// Returns true if the URL contains ?mode=developer
function isDeveloperMode() {
    if (typeof window !== 'undefined' && window.location && window.location.search) {
        const params = new URLSearchParams(window.location.search);
        return params.get('mode') === 'developer';
    }
    return false;
}

export const SETTINGS_DEVELOPER = isDeveloperMode(); // Now determined by URL parameter

export const SETTINGS_PATHS = {
    MEDALLION_MAP: './medallion-map.json',
    STORY_CHAPTER: './story/${chapterId}.md',
    ANIMAL_INFO: './animals/${animalId}.md',
    ANIMAL_MARKDOWN: './animals/${animalName}.md',
    STORY_FIRST_CHAPTER: './story/1-chapter.md',
    STORY_ANIMAL_CHAPTER: './story/${animal}.md',
    STORY_MILESTONE_CHAPTER: './story/${milestoneNumber}-chapter.md',
    INFO_PROJECT: './info.md',
    ABOUT_ANIMALS: './about-animals.md'
};
