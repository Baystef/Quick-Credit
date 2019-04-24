function cellHeaders(tableId) {
  try {
    const thArray = [];
    // const table = document.getElementsByClassName(tableId);
    const headers = document.getElementsByTagName('th');
    for (let i = 0; i < headers.length; i += 1) {
      const headingText = headers[i].innerHTML;
      thArray.push(headingText);
    }
    const styleElm = document.createElement('style');

    document.head.appendChild(styleElm);
    const styleSheet = styleElm.sheet;
    for (let i = 0; i < thArray.length; i += 1) {
      styleSheet.insertRule(`.${tableId} td:nth-child(${i + 1})::before {content:"${thArray[i]}: ";}`,
        styleSheet.cssRules.length);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(`cellHeaders(): ${err}`);
  }
}
cellHeaders('dashboard-table');
