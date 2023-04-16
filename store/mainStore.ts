import {defineStore} from 'pinia'

export const useMainStore = defineStore('main', {
    state: () => ({
        panelConfigurator: {
            thickness: 0,
            length: 0,
            width: 0,
        },
    }),
    actions: {
        setThickness(thickness: number) {
            this.panelConfigurator.thickness = thickness;
        },
        setLength(length: number) {
            this.panelConfigurator.length = length;
        },
        setWidth(width: number) {
            this.panelConfigurator.width = width;
        }
    },
})
