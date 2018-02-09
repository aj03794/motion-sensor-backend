// This is the parital application function that ultimately is responsible
// for returning values to the client;

export const partialApplicationFunction = data => {
  // this req and h corresponds to the parameters that hapi has in its routes
  return (req, h) => {
    console.log('partialApplicationFunction')
      const res = h.response(JSON.stringify(data))
      // const res = h.response(JSON.stringify(data));
      res.headers = { 'content-type': 'application/json' }
      console.log(res);
      return res
    }
  }


// sendClientData will hold the function that partialApplicationFunction returns
// after it is invoked the first time
export const sendClientData = null;
