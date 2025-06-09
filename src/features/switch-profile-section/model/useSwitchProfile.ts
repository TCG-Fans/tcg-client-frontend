import { ref } from 'vue'

export enum ProfileSection {
    Collection = 'collection',
    Deck = 'deck',
}

const activeSection = ref<ProfileSection>(ProfileSection.Deck)

export function useProfileSectionStore() {
    function setSection(section: ProfileSection) {
        activeSection.value = section
    }

    return {
        activeSection,
        setSection,
    }
}
