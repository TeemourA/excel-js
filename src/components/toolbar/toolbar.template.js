const toButton = button => {
  const dataSet = `
    data-type="button"
    data-value='${JSON.stringify(button.value)}'
  `;

  return `
  <div ${dataSet} class="button ${button.active ? 'active' : ''}">
    <i ${dataSet} class="material-icons">${button.icon}</i>
  </div>
`;
};

const createToolbar = state => {
  const buttons = [
    {
      icon: 'format_align_left',
      active: state['textAlign'] === 'left',
      value: { textAlign: 'left' },
    },
    {
      icon: 'format_align_center',
      active: state['textAlign'] === 'center',
      value: { textAlign: 'center' },
    },
    {
      icon: 'format_align_right',
      active: state['textAlign'] === 'right',
      value: { textAlign: 'right' },
    },
    {
      icon: 'format_bold',
      active: state['fontWeight'] === 'bold',
      value: { fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold' },
    },
    {
      icon: 'format_italic',
      active: state['fontStyle'] === 'italic',
      value: {
        fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic',
      },
    },
    {
      icon: 'format_underlined',
      active: state['textDecoration'] === 'underline',
      value: {
        textDecoration:
          state['textDecoration'] === 'underline' ? 'none' : 'underline',
      },
    },
  ];

  return buttons.map(toButton).join('');
};

export default createToolbar;
