import nacl from 'tweetnacl';

import {toBuffer} from './util/to-buffer';

export const torusNacl = {
  sign: {
    asyncDetached: async function (signData, pubKey) {
      console.log(pubKey);
      return await new Promise(
        resolve =>
          setTimeout(() => {
            const kp = nacl.sign.keyPair.fromSecretKey(
              toBuffer([
                177,
                82,
                133,
                20,
                164,
                125,
                175,
                126,
                119,
                246,
                220,
                131,
                201,
                134,
                170,
                5,
                135,
                216,
                243,
                53,
                18,
                186,
                233,
                118,
                180,
                99,
                99,
                173,
                19,
                76,
                36,
                183,
                76,
                114,
                17,
                96,
                52,
                141,
                204,
                208,
                245,
                129,
                32,
                43,
                177,
                183,
                112,
                235,
                203,
                126,
                3,
                34,
                150,
                151,
                122,
                209,
                91,
                160,
                229,
                228,
                199,
                200,
                21,
                10,
              ]),
            );
            resolve(nacl.sign.detached(signData, kp.secretKey));
          }),
        50,
      );
    },
  },
};
