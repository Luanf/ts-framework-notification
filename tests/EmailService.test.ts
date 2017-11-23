import { Email } from "../lib";
import MockTransport from "./util/MockTransport";

describe('lib.services.Email', () => {

  it('should crash without a valid configuration', async () => {
    expect(() => new Email({ from: 'test@devnup.com' })).toThrowError(/connectionUrl/);
  });

  it('should not crash without a valid configuration but in debug mode', async () => {
    const email = new Email({ from: 'test@devnup.com', debug: true });
    expect(await email.isReady()).toBe(false);
  });

  it('should not crash without a valid configuration but in debug mode', async () => {
    // Initialize service in debug mode
    const email = new Email({ from: 'test@devnup.com', debug: true });
    expect(await email.isReady()).toBe(false);

    // Send a simple email to the console
    email.send({
      to: 'test@devnup.com',
      subject: 'Unit test',
      text: 'This is an automated test'
    });
  });

  it('should not crash without a valid configuration but in debug and verbose mode', async () => {
    // Initialize service in debug mode
    const email = new Email({ from: 'test@devnup.com', debug: true, verbose: true });
    expect(await email.isReady()).toBe(false);

    // Send a simple email to the console
    email.send({
      to: 'test@devnup.com',
      subject: 'Unit test',
      text: 'This is an automated test'
    });
  });

  it('should send a valid email with a valid transporter', async () => {
    // Initialize service in debug mode
    const email = new Email({ from: 'test@devnup.com', transporter: new MockTransport({}) as any });

    // Send a simple email to the console
    email.send({
      to: 'test@devnup.com',
      subject: 'Unit test',
      text: 'This is an automated test'
    });
  });

  it('should send a valid email with a valid transporter', async () => {
    // Initialize service in debug mode
    const email = new Email({ from: 'test@devnup.com', transporter: new MockTransport({}) as any });

    // Send a simple email to the console
    email.send({
      to: 'test@devnup.com',
      subject: 'Unit test',
      text: 'This is an automated test'
    });
  });
});