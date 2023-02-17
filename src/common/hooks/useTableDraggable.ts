/* Vue table draggable Hook  */
/* antd vue 版本 table 拖拽 hook  */
/**
 * antd vue 版本 table 拖拽 hook
 * @param dataSource table数据集合
 * @returns customRow 行属性方法
 */
function DraggableHook<T>(dataSource: Array<T>) {
  let dragItem: T;
  let targItem: T;
  const customRow = (record: T) => {
    return {
      draggable: true,
      ondrag(e: DragEvent) {
        console.log("ondrag:", e);
        dragItem = record;
      },
      ondrop(e: DragEvent) {
        console.log("ondrop:", e);
        targItem = record;
      },
      ondragend(e: DragEvent) {
        console.log("ondragend:", e);
        if (dragItem !== targItem) {
          const dragItemIndex = dataSource.indexOf(dragItem);
          const targItemIndex = dataSource.indexOf(targItem);
          // 解构交换
          [dataSource[dragItemIndex], dataSource[targItemIndex]] = [
            dataSource[targItemIndex],
            dataSource[dragItemIndex]
          ];
        }
      },
      ondragover(e: DragEvent) {
        console.log("ondragover:", e);
        return false;
      }
    };
  };
  return customRow;
}

export default DraggableHook;
