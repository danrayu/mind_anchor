interface SwitchItemProps {
  switch: (id:number) => void;
  state: Meme;
  category: Category;
}

function SwitchCategory(props: SwitchItemProps) {
  function onSwitch() {
    props.switch(props.category.id);
  }

  function isActive() {
    return (props.state.categories.findIndex(cat => cat.id === props.category.id) !== -1);
  }
  return (
    <div className={"mt-2 btn p-3 " + (isActive() ? "btn-primary " : " bg-slate-200 hover:bg-slate-400 ")} onClick={onSwitch}>
      <div>
        <span>{props.category.name}</span>
      </div>
    </div>
  )
}


export default SwitchCategory