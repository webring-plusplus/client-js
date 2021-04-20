/// webring("google.com", (uri, peers, depth) => console.log(uri, peers, depth) [, depth = 1]);
const webring = (uri, onsucc, depth = 1) => {
  const request = new XMLHttpRequest();
  request.open('GET', `https://${uri}/webring++.json`, true);
  
  request.onload = () => {
    const status = this.status;
    if (200 <= status < 400) {
      const children = JSON.parse(this.response).links;
      onsucc(uri, children, depth);
      if (depth > 0) {
        children.forEach((child) => { webring(child, onsucc, depth - 1); });
      }
    }
  };
  
  request.onerror = () => {
    console.warn(`webring error on ${uri}`);
  };
  
  request.send();
}

