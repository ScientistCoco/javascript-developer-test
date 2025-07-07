## Requirements
- Input is an array of url strings
- Expectation to perform a get request on each string in that array. Use the `httpGet` function and not any other fetch library to perform the http request
- Output is a Promise<Array<Result>> where result is an object of two potential types.

    So for the success case (200 status code):
```
{
    'Arnie Quote': <message>
}
```

And for the failure case (non 200 status code):
```
{
    'FAILURE': <message>
}
```
- Input validation is not required. We can always expect it will be a url that can be parseable

## Thoughts:
- I can use Promise.all() to execute all the requests at once rather than witing for each request to return before running the next one. However we don't want the execution to end immediately if a request fails, so we should use Promise.allSettled() instead
- One sample response:
```
    {
      status: 'fulfilled',
      value: { status: 200, body: '{"message":"Get to the chopper"}' }
    }
```
So here the body is just a string containing a json object which makes sense because in mock-http-interface they use JSON.stringify