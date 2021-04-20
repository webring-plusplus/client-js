/// webring("google.com", (uri, peers, depth) => console.log(uri, peers, depth) [, depth = 1]);
const webring = (uri, onsucc, depth = 1) => {
  const request = new XMLHttpRequest();
  request.open('GET', `//${uri}/webring++.json`, true);
  
  request.onload = () => {
    const status = request.status;
    if (200 <= status < 400) {
      const response = request.response;
      var children;
      try {
        children = JSON.parse(response).links;
      } catch (_e) {
        console.log(`webring++: invalid metadata at ${uri} (maybe 404)`);
        return;
      }

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

