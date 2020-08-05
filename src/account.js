// @flow
import nacl from 'tweetnacl';
import type {KeyPair} from 'tweetnacl';

import {toBuffer} from './util/to-buffer';
import {PublicKey} from './publickey';

/**
 * An account key pair (public and secret keys).
 */
export class Account {
  _keypair: KeyPair;
  _isTorus: Boolean;

  /**
   * Create a new Account object
   *
   * If the secretKey parameter is not provided a new key pair is randomly
   * created for the account
   *
   * @param secretKey Secret key for the account
   */
  constructor(secretKey?: Buffer | Uint8Array | Array<number> | String) {
    if (typeof secretKey === 'string') {
      if (secretKey === 'torus') {
        this._isTorus = true;
      } else {
        throw new Error('only Torus remote accounts are supported');
      }
    } else if (secretKey) {
      this._keypair = nacl.sign.keyPair.fromSecretKey(toBuffer(secretKey));
    } else {
      this._keypair = nacl.sign.keyPair();
    }
  }

  /**
   * The public key for this account
   */
  get publicKey(): PublicKey {
    if (this._isTorus) {
      throw new Error('cannot access publickey synchronously for Torus accounts');
    }
    return new PublicKey(this._keypair.publicKey);
  }

  /**
   * The **unencrypted** secret key for this account
   */
  get secretKey(): Buffer {
    if (this._isTorus) {
      throw new Error('cannot access secretkey synchronously for Torus accounts');
    }
    return this._keypair.secretKey;
  }

  /**
   * Return public key via async call
   */
  asyncPublicKey(): Promise<PublicKey> {
    // TODO: mock remote call first, fix later
    if (!this._isTorus) {
      return Promise.resolve(new PublicKey(this._keypair.publicKey));
    }
    return new Promise(resolve => setTimeout(() => {
      const kp = nacl.sign.keyPair.fromSecretKey(toBuffer([177, 82, 133, 20, 164, 125, 175, 126, 119, 246, 220, 131, 201, 134, 170, 5, 135, 216, 243, 53, 18, 186, 233, 118, 180, 99, 99, 173, 19, 76, 36, 183, 76, 114, 17, 96, 52, 141, 204, 208, 245, 129, 32, 43, 177, 183, 112, 235, 203, 126, 3, 34, 150, 151, 122, 209, 91, 160, 229, 228, 199, 200, 21, 10]));
      resolve(new PublicKey(kp.publicKey));
    }, 50));
  }
}
