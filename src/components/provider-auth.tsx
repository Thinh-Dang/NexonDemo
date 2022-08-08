import { Button } from 'antd';
import { ProviderEnum } from '../types/enum';

type Props = {
  provider: ProviderEnum;
  signIn: () => void;
  removeTodo: (id: number) => void;
};

const ProviderAuth: React.FC<Props> = ({ provider, signIn }) => {
  return (
    <Button type="primary" htmlType="submit" onClick={signIn}>
      Sign in `{provider}`
    </Button>
  );
};
export default ProviderAuth;
