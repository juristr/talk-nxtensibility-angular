import { CompilemdExecutorSchema } from './schema';
import executor from './executor';

const options: CompilemdExecutorSchema = {};

describe('Compilemd Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
