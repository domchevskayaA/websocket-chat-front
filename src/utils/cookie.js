const getCookie = (cname) => {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  };

  const setCookie = (name, value, expDays) => {
    const d = new Date();
    d.setTime(d.getTime() + (expDays*24*60*60*1000));
    document.cookie = `${name}=${value};path=/;expires=${d.toUTCString()}`;
  };

  const deleteCookie = (name) => {
    document.cookie = `${name}='';path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  };

  export {
    getCookie,
    setCookie,
    deleteCookie,
   };