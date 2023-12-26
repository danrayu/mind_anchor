import { CategoryState } from "./EditMeme";

interface SwitchItemProps {
  switch: (id:number) => void;
  state: CategoryState;
}

function SwitchCategory(props: SwitchItemProps) {
  function onSwitch() {
    props.switch(props.state.category.id);
  }
  return (
    <div className={"mt-2 badge p-3 " + (props.state.active ? "badge-primary " : " badge-ghost ")} onClick={onSwitch}>
      <div>
        <span>{props.state.category.name}</span>
      </div>
    </div>
  )
}


export default SwitchCategory