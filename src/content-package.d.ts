declare module 'virtual:minor-revisions-content' {
  const contentPackage:
    | { readonly kind: 'valid'; readonly value: import('./content/index.ts').BuiltContentPackage }
    | {
        readonly kind: 'invalid';
        readonly issues: readonly import('./content/index.ts').ContentIssue[];
      };
  export default contentPackage;
}
