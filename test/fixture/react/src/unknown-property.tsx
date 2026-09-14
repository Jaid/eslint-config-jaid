export const UnknownProperty = () => {
  // @ts-expect-error intentional react/no-unknown-property fixture
  return <div class='wrong' />
}
