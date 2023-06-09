import superjson from 'superjson';

import { rpcSchema } from './rpc-schema';

import { tineAction } from '../../tineAction';

const rpc = tineAction(
  async ({ endpoint, secret, action, payload, name }, { ctx }) => {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Tine-Secret': secret,
      },
      body: JSON.stringify(superjson.serialize({ ctx, action, name, payload })),
    });

    return superjson.deserialize(await res.json());
  },
  {
    action: 'rpc',
    schema: rpcSchema,
    skipParse: true,
  },
);

export default rpc;
