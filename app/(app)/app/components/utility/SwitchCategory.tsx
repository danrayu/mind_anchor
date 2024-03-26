import { getBtnColordClasses } from "@/app/util/colors";

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
    <div className={"mt-2 btn p-3 mr-2 " + (isActive() ? `${getBtnColordClasses(props.category.colorId) + " text-black"}` : " bg-neutral  ")} onClick={onSwitch}>
      <div>
        <span>{props.category.name}</span>
      </div>
    </div>
  )
}


export default SwitchCategory