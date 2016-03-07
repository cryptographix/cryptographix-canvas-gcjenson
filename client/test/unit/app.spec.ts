import {App} from '../../src/app';

class RouterStub {
  routes;
  
  configure(handler) {
    handler(this);
  }
  
  map(routes) {
    this.routes = routes;
  }
}

describe('the App module', () => {
  var sut, mockedRouter;

  beforeEach(() => {
    mockedRouter = new RouterStub();
    sut = new App();
    sut.configureRouter(mockedRouter, mockedRouter);
  });

  it('contains a router property', () => {
    expect(sut.router).toBeDefined();
  });

  it('configures the router title', () => {
    expect(sut.router.title).toEqual('comp3200');
  });

  it('should have a home route', () => {
    expect(sut.router.routes).toContain({ route: ['','home'], name: 'home',  moduleId: 'home', nav: true, title:'Home', settings:'home' });
  });

  it('should have a my networks route', () => {
    expect(sut.router.routes).toContain({ route: ['my-networks'], name: 'my-networks', moduleId: 'my-networks', nav: true, title: 'My Networks', settings: 'share-alt' });
  });
});