export const List = ({items}: {items: string[]}) => <div>{items.map(item => <span>{item}</span>)}</div>
