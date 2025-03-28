import { Attributes, Extension } from '@tiptap/core'
import '@tiptap/extension-text-style'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customClass: {
      setCustomClass: (size: string) => ReturnType
      unsetCustomClass: () => ReturnType
    }
  }
}

export const customClass = Extension.create({
  name: 'customClass',

  addOptions() {
    return {
      types: ['textStyle'],
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: ['paragraph'],
        attributes: {
          class: {},
        },
      },
      {
        types: this.options.types,
        attributes: {
          customClass: {
            parseHTML: element => element.classList.toString(),
            renderHTML: attributes => {
              if (!attributes.customClass) {
                return {}
              }

              return {
                class: `${attributes.customClass}`,
              }
            },
          },
        } as Attributes,
      },
    ]
  },

  addCommands() {
    return {
      setCustomClass:
        (customClass: string) =>
        ({ chain }) =>
          chain().setMark('textStyle', { customClass }).run(),
      unsetCustomClass:
        () =>
        ({ chain }) =>
          chain().setMark('textStyle', { customClass: null }).removeEmptyTextStyle().run(),
    }
  },
})

export default customClass
