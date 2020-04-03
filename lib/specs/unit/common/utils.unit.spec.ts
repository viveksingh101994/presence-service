import { Utils, RouteType } from '../../../src/common';
import { expect } from 'chai';

describe('Utils', () => {
  it('getRoutePrefix give url in format /api/v1/ if routeType is private', () => {
    const url = Utils.getRoutePrefix(RouteType.private, '/s');
    expect(url).to.be.equal('/api/v1/s');
  });

  it('getRoutePrefix give url in format /api/public/ if routeType is public', () => {
    const url = Utils.getRoutePrefix(RouteType.public, '/s');
    expect(url).to.be.equal('/api/public/s');
  });

  it('getRoutePrefix give url if routeType is not public or private', () => {
    const url = Utils.getRoutePrefix(3, '/s');
    expect(url).to.be.equal('/s');
  });

  it('charactersinEmailAreValid should return false if unknown character is used', () => {
    expect(Utils.charactersInEmailAreValid('#')).to.be.false;
  });

  it('isEmailValid should return false if unknown character is there', () => {
    expect(Utils.isEmailValid('#')).to.be.false;
  });
  it('isEmailValid should return false if there are more than one @', () => {
    expect(Utils.isEmailValid('v@v@s')).to.be.false;
  });
  it('isEmailValid should return false if there is dot before @', () => {
    expect(Utils.isEmailValid('v.@')).to.be.false;
  });
  it('isEmailValid should return false if + is after @', () => {
    expect(Utils.isEmailValid('vs@+~.com')).to.be.false;
  });
  it('isEmailValid should return false if are two ..', () => {
    expect(Utils.isEmailValid('v.v@..')).to.be.false;
  });

  it('isEmailValid should return false if there is only .', () => {
    expect(Utils.isEmailValid('v.v@.')).to.be.false;
  });
});
