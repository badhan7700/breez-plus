// Rules shared by the login and register screens.
export const UNIVERSITY_DOMAIN = "@eastdelta.edu.bd";

export function isUniversityEmail(email: string) {
  return email.trim().toLowerCase().endsWith(UNIVERSITY_DOMAIN);
}
