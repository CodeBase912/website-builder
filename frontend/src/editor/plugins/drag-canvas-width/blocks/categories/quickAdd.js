const category = "Quick Add";

const quickAddBlocks = [
  // Text block
  {
    id: "Text",
    label: "Text",
    category: {
      id: category,
      label: category,
      order: 0,
      open: true,
    },
    media: `
      <svg style="width:100%;height:100%" viewBox="0 0 24 24">
        <path fill="currentColor" d="M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,6.87 17.26,6.43C16.73,6 16.11,6 15.5,6H13V16.5C13,17 13,17.5 13.33,17.75C13.67,18 14.33,18 15,18V19H9V18C9.67,18 10.33,18 10.67,17.75C11,17.5 11,17 11,16.5V6H8.5C7.89,6 7.27,6 6.74,6.43C6.21,6.87 5.75,7.74 5.3,8.61L4.34,8.35L5.5,4H18.5Z" />
      </svg>
    `,
    activate: true,
    content: {
      type: "text",
      content: "Insert your text here",
      style: { padding: "10px" },
    },
  },
  // Paragraph block
  {
    id: "Paragraph",
    label: "Paragraph",
    category: { id: category, label: category, order: 1, open: true },
    media: `
      <svg width="100%" height="100%" viewBox="0 0 108 51">
        <path id="Path_1250" data-name="Path 1250" d="M1,51a1,1,0,0,1-1-1V40.667a1,1,0,0,1,1-1H55.4a1,1,0,0,1,1,1V50a1,1,0,0,1-1,1ZM1,31.167a1,1,0,0,1-1-1V20.833a1,1,0,0,1,1-1H107a1,1,0,0,1,1,1v9.334a1,1,0,0,1-1,1ZM1,11.334a1,1,0,0,1-1-1V1A1,1,0,0,1,1,0H83a1,1,0,0,1,1,1v9.333a1,1,0,0,1-1,1Z" />
      </svg>
    `,
    activate: true,
    content: {
      type: "text",
      content: `
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde officia culpa repellat laboriosam rem amet porro ducimus harum tenetur in
        praesentium adipisci odio ea, iste modi nobis obcaecati autem labore! Autem iusto dignissimos adipisci repudiandae provident dolorum, 
        vero distinctio ex. Expedita blanditiis quod ipsam quae est fugiat accusantium quo animi porro. Nesciunt non quas natus inventore iusto, 
        temporibus saepe recusandae. Molestiae id minima cum blanditiis repudiandae at illum fugit, veniam consequuntur, explicabo eius nemo enim
        dicta architecto temporibus suscipit nobis fugiat accusamus atque maiores quaerat? Accusantium esse dolorum doloribus? Ipsum. Eum, ipsa 
        quibusdam incidunt omnis velit consequuntur vel repellendus fuga? Necessitatibus libero architecto animi autem atque praesentium voluptate 
        aut dignissimos maiores obcaecati repudiandae tempora magni, eveniet laborum quisquam neque impedit?Sed mollitia, temporibus veniam quaerat 
        in aperiam recusandae repellat earum, ex nobis nesciunt quod libero. Tempore commodi nihil enim vel maxime debitis dolores architecto expedita. Rerum libero provident cupiditate laboriosam.
      `,
      style: { padding: "10px" },
    },
  },
  // Link block
  {
    id: "Link",
    label: "Link",
    category: { id: category, label: category, order: 0, open: true },
    media: `
      <svg style="width:100%;height:100%" viewBox="0 0 24 24">
        <path fill="currentColor" d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z" />
      </svg>
    `,
    activate: true,
    content: {
      type: "link",
      content: "Insert your link here",
      style: { color: "#d983a6" },
    },
  },
  // Container block
  {
    id: "Container",
    label: "Container",
    category: { id: category, label: category, order: 0, open: true },
    media: `
      <svg width="100%" height="100%" viewBox="0 0 61 50">
        <path id="Path_1251" data-name="Path 1251" d="M59,50H2a2,2,0,0,1-2-2V2A2,2,0,0,1,2,0H59a2,2,0,0,1,2,2V48A2,2,0,0,1,59,50ZM3,3V47H58V3Z" />
      </svg>
    `,
    content: {
      type: "qk-sect",
    },
  },
  // 2 Columns block
  {
    id: "2 Columns",
    label: "2 Columns",
    category: { id: category, label: category, order: 0, open: true },
    media: `
      <svg width="100%" height="100%" viewBox="0 0 85.486 60.468">
        <path id="Path_1249" data-name="Path 1249" d="M47.8,60.468a2.427,2.427,0,0,1-2.431-2.419V2.418A2.427,2.427,0,0,1,47.8,0H83.055a2.427,2.427,0,0,1,2.431,2.418V58.049a2.427,2.427,0,0,1-2.431,2.419Zm.93-3.489h33.43V3.488H48.732Zm-46.3,3.489A2.427,2.427,0,0,1,0,58.049V2.418A2.427,2.427,0,0,1,2.431,0H37.683a2.427,2.427,0,0,1,2.431,2.418V58.049a2.427,2.427,0,0,1-2.431,2.419Zm.93-3.489H36.79V3.488H3.361Z"/>
      </svg>
    `,
    content: {
      type: "2-col-grid",
    },
  },
  // 3 Columns block
  {
    id: "3 Columns",
    label: "3 Columns",
    category: { id: category, label: category, order: 0, open: true },
    media: `
      <svg width="100%" height="100%" viewBox="0 0 130.857 60.468">
        <path id="Path_1249" data-name="Path 1249" d="M93.174,60.468a2.427,2.427,0,0,1-2.431-2.419V2.418A2.427,2.427,0,0,1,93.174,0h35.252a2.427,2.427,0,0,1,2.431,2.418V58.049a2.427,2.427,0,0,1-2.431,2.419Zm.93-3.489h33.43V3.488H94.1ZM47.8,60.468a2.427,2.427,0,0,1-2.431-2.419V2.418A2.427,2.427,0,0,1,47.8,0H83.055a2.427,2.427,0,0,1,2.431,2.418V58.049a2.427,2.427,0,0,1-2.431,2.419Zm.93-3.489h33.43V3.488H48.732Zm-46.3,3.489A2.427,2.427,0,0,1,0,58.049V2.418A2.427,2.427,0,0,1,2.431,0H37.683a2.427,2.427,0,0,1,2.431,2.418V58.049a2.427,2.427,0,0,1-2.431,2.419Zm.93-3.489H36.79V3.488H3.361Z"/>
      </svg>
    `,
    content: {
      type: "3-col-grid",
    },
  },
  // Image block
  {
    id: "Image",
    label: "Image",
    category: { id: category, label: category, order: 0, open: true },
    media: `
      <svg style="width:100%;height:100%" viewBox="0 0 24 24">
        <path fill="currentColor" d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
      </svg>
    `,
    activate: true,
    content: { type: "image" },
  },
  // Map block
  {
    id: "Map",
    label: "Map",
    category: { id: category, label: category, order: 0, open: true },
    media: `
      <svg style="width:100%;height:80%" viewBox="0 0 576 512">
        <path d="M384 476.1L192 421.2V35.93L384 90.79V476.1zM416 88.37L543.1 37.53C558.9 31.23 576 42.84 576 59.82V394.6C576 404.4 570 413.2 560.9 416.9L416 474.8V88.37zM15.09 95.13L160 37.17V423.6L32.91 474.5C17.15 480.8 0 469.2 0 452.2V117.4C0 107.6 5.975 98.78 15.09 95.13V95.13z"/>
      </svg>
    `,
    content: {
      type: "map",
      style: { height: "350px", width: "100%" },
    },
  },
];

export default quickAddBlocks;
