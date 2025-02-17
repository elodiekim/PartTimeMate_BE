export type Payload = {
  id: string;
  email: string;
  role: string;
  type: 'access' | 'refresh';
};
