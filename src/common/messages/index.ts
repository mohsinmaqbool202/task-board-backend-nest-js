import { verify } from "crypto";

export const Messages = {
  created: (resource: string) => `The ${resource.toLowerCase()} created successfully!`,
  updated: (resource: string) => `The ${resource.toLowerCase()} updated successfully!`,
  deleted: (resource: string) => `The ${resource.toLowerCase()} deleted successfully!`,
  notFound: (resource: string) => `The ${resource.toLowerCase()} not found`,
  fetched: (resource: string) => `The ${resource.toLowerCase()} fetched successfully!`,
  list: (resource: string) => `All ${resource.toLowerCase()}s fetched successfully!`,
  verify: () => 'We’ve sent you a verification email. Please check your inbox to complete the signup process.',
  verified: () => 'Your email has been verified successfully!',
  loggedIn: () => `You are loggedIn successfully!`,
  invitationSent: () => `Invitation sent successfully!`,
};