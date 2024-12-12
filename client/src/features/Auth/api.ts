import type { User, UserForAuthorisation, UserForRegistration } from './type';

export const registrationFetch = async (obj: UserForRegistration): Promise<User> => {
  const res = await fetch('/api/auth/sign-up', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
  if (res.ok) {
    const data = await res.json();
    return data.user;
  }
  const { message } = await res.json();
  throw message;
};

export const logoutFetch = async (): Promise<{ message: string }> => {
  const res = await fetch('/api/auth/logout');
  const data: { message: string } = (await res.json()) as { message: string };
  return data;
};

export const checkUserFetch = async (): Promise<User> => {
  const res = await fetch('/api/auth/check', {
    method: 'GET',
    credentials: 'include',
  });
  if (res.ok) {
    const data = await res.json();    
    return data.user;
  }
  const { message } = await res.json();
  throw message;
};

export const authorisationFetch = async (obj: UserForAuthorisation): Promise<User> => {
  const res = await fetch('/api/auth/sign-in', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  });
  if (res.ok) {
    const data = await res.json();

    return data.user;
  }
  const { message } = await res.json();
  throw message;
};


