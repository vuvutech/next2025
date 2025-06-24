import "better-auth";

declare module "better-auth" {
  interface User {
    studentId?: string | null;
    role?: string | null;
  }

  // You don't need to declare Session unless you're adding custom fields inside `session`
  // So you can either remove this entirely...
  // OR update it if you *do* want to extend it like:
  // interface Session {
  //   impersonatedBy?: string;
  // }
}
