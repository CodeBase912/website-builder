export default (editor, opts = {}) => {
  const components = editor.Components;

  // Two Column grid
  components.addType("2-col-grid", {
    // Detect '.el-Y' elements
    isComponent: (el) => el.classList?.contains("2-col-grid"),
    model: {
      defaults: {
        name: "Section", // Simple custom name
        draggable: true,
        droppable: true,
        tagName: "section",
        attributes: { class: "cg2-css" },
        components: [
          {
            name: "Column 1",
            tagName: "div",
            attributes: { class: "cg2-col" },
            components: {
              type: "text",
              content: "Column 1",
            },
            draggable: true,
            droppable: true,
          },
          {
            name: "Column 2",
            tagName: "div",
            attributes: { class: "cg2-col" },
            components: {
              type: "text",
              content: "Column 2",
            },
            draggable: true,
            droppable: true,
          },
        ],
        styles: `
            .cg2-css { 
              display: grid;
              grid-template-columns: 1fr 1fr; 
              min-height: 200px;
              height: fit-content;
              padding: 10px;
            }
            .cg2-col { 
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 100%;
            }

            @media (max-width: 350px) {
              .cg2-css { 
              grid-template-columns: 1fr; 
            }
          `,
      },
    },
  });

  // Three column grid
  components.addType("3-col-grid", {
    // Detect '.el-Y' elements
    isComponent: (el) => el.classList?.contains("3-col-grid"),
    model: {
      defaults: {
        name: "Section", // Simple custom name
        draggable: true,
        droppable: true,
        tagName: "section",
        attributes: { class: "cg3-css" },
        components: [
          {
            name: "Column 1",
            tagName: "div",
            attributes: { class: "cg3-col" },
            components: {
              type: "text",
              content: "Column 1",
            },
            draggable: true,
            droppable: true,
          },
          {
            name: "Column 2",
            tagName: "div",
            attributes: { class: "cg3-col" },
            components: {
              type: "text",
              content: "Column 2",
            },
            draggable: true,
            droppable: true,
          },
          {
            name: "Column 3",
            tagName: "div",
            attributes: { class: "cg3-col" },
            components: {
              type: "text",
              content: "Column 3",
            },
            draggable: true,
            droppable: true,
          },
        ],
        styles: `
            .cg3-css { 
              display: grid;
              grid-template-columns: 1fr 1fr 1fr; 
              min-height: 200px;
              height: fit-content;
              padding: 10px;
            }
            .cg3-col { 
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 100%;
            }

            @media (max-width: 550px) {
              .cg3-css { 
              grid-template-columns: 1fr; 
            }
          `,
      },
    },
  });

  // Section qk-sect = quick-section
  components.addType("qk-sect", {
    // Detect '.el-Y' elements
    isComponent: (el) => el.classList?.contains("qk-sect"),
    model: {
      defaults: {
        name: "Section", // Simple custom name
        draggable: true,
        droppable: true,
        tagName: "section",
        attributes: { class: "qks-css" },
        components: {
          type: "text",
          content: "Section",
        },
        styles: `
            .qks-css { 
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 100%;
              min-height: 200px;
              height: fit-content;
              padding: 10px;
            }
          `,
      },
    },
  });
};
