import checklist from "~/data/checklist";
import { Checkbox, CheckboxWrapper } from "../Common/Inputs.styled";
import { FaCheck } from "react-icons/fa";
import { useEffect, useState } from "react";

export const CheckList = ({ updateProgress }) => {
  const [data, setData] = useState(checklist);

  const handleCheck = ({ sectionName, itemTitle }) => {
    const updatedData = data.map((item) => {
      if (item.section === sectionName) {
        const updItems = item.items.map((item) => {
          if (item.title === itemTitle) {
            return { title: itemTitle, isChecked: !item.isChecked };
          }

          return item;
        });

        return { section: sectionName, items: updItems };
      }

      return item;
    });

    setData(updatedData);
  };

  const countCheckedFromList = (data) => {
    const totalSections = data.length;
    const checkedSectionsQty = data.filter(({ items }) => {
      const total = items.length;
      const checkedQty = items.filter(({ isChecked }) => isChecked).length;

      return total === checkedQty;
    }).length;

    return {
      isAllChecked: totalSections === checkedSectionsQty,
      progress: {
        done: checkedSectionsQty,
        total: totalSections,
      },
    };
  };

  useEffect(() => {
    updateProgress(countCheckedFromList(data).progress);
  }, [data, updateProgress]);

  return (
    <>
      <h3>{countCheckedFromList(data).indicator}</h3>
      <ul>
        {data.map(({ section, items }) => {
          return (
            <li>
              <h3>{section}</h3>
              <ul>
                {items.map(({ title, isChecked }) => {
                  return (
                    <li>
                      <p>{title}</p>
                      <CheckboxWrapper>
                        <Checkbox
                          type="checkbox"
                          checked={isChecked}
                          onChange={() =>
                            handleCheck({
                              sectionName: section,
                              itemTitle: title,
                            })
                          }
                        />
                        <span>
                          <FaCheck size={28} />
                        </span>
                      </CheckboxWrapper>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </>
  );
};
