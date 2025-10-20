import { useEffect, useState } from "react";
import {
  DeleteBtn,
  SortBtn,
  Table,
  TableInputWrapper,
  TableWrapper,
  Td,
  Th,
} from "./DashboardPage.styled";
import { API } from "~/API/API";
import { useAPI } from "~/hooks/useAPI";
import DatePicker from "react-multi-date-picker";
import { TiDeleteOutline } from "react-icons/ti";
import { countBags, getAllColums, getSortBy } from "~/helpers/dashboard";
import { EmptyRow } from "./EmptyRow";
import { EssentialsCheckbox, PickUpCheckbox } from "../Common/PickUpCheckbox";
import { Container, Section } from "../SharedLayout/SharedLayout.styled";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { StateIndicator } from "../Common/StateIndicator";
import { QtyInput } from "../Common/QtyInput";

const DashboardPage = () => {
  const [dispatch, data, isLoading, isError] = useAPI(API.getAll);
  const [update] = useAPI(API.update);
  const [deleteRow] = useAPI(API.delete);
  const [sortBy, setSortBy] = useState("id");

  useEffect(() => {
    if (!data) {
      dispatch();
    }
  }, [dispatch, data]);

  const handleChange = (id, body) => {
    update({ id, body }).then(() => dispatch());
  };

  return (
    <Section>
      <Container>
        <TableWrapper>
          <StateIndicator
            isError={isError}
            isLoading={isLoading}
            success={data?.length}
            text={isError && "Something went wrong..."}
          />
          {data && !isError && (
            <Table>
              <thead>
                <tr>
                  {getAllColums(data).allColumns.map((col, i) => {
                    if (i <= 2) {
                      return (
                        <Th key={col}>
                          <SortBtn type="button" onClick={() => setSortBy(col)}>
                            {col}
                            {sortBy === col && (
                              <FaSortAmountDownAlt size={16} />
                            )}
                          </SortBtn>
                        </Th>
                      );
                    }

                    return <Th key={col}>{col}</Th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {data.sort(getSortBy(sortBy)).map((item) => (
                  <tr key={item.id}>
                    <Td className="id">
                      <DeleteBtn
                        type="button"
                        onClick={() => deleteRow(item.id).then(dispatch)}
                      >
                        {item.id}
                        <span>
                          <TiDeleteOutline size={30} />
                        </span>
                      </DeleteBtn>
                    </Td>
                    <Td className="address">{item.address}</Td>
                    <Td>
                      <DatePicker
                        placeholder=" - "
                        inputClass="date-picker"
                        format="DD/MM/YY"
                        multiple
                        minDate={new Date()}
                        value={item.nextCheckout}
                        sort
                        onChange={(dates) => (item.nextCheckout = dates)}
                        onClose={() => {
                          handleChange(item.id, item);
                        }}
                      />
                    </Td>
                    <Td>
                      <PickUpCheckbox
                        onChange={() =>
                          handleChange(item.id, {
                            ...item,
                            pickupNeeded: !item.pickupNeeded,
                          })
                        }
                        item={item}
                      />
                    </Td>
                    <Td className="bags-needed">{countBags(item)}</Td>
                    {getAllColums(data).allLinens.map((name) => {
                      const found = item.linens.find((l) => l.name === name);

                      return (
                        <Td key={name}>
                          {found ? (
                            <TableInputWrapper>
                              <QtyInput
                                item={item}
                                found={found}
                                itemKey={"linens"}
                                column={"available"}
                                defaultValue={found.available}
                                handleChange={handleChange}
                              />
                              {" / "}
                              <QtyInput
                                item={item}
                                found={found}
                                itemKey={"linens"}
                                column={"minimum"}
                                handleChange={handleChange}
                                defaultValue={found.minimum}
                              />
                            </TableInputWrapper>
                          ) : (
                            "—"
                          )}
                        </Td>
                      );
                    })}

                    {getAllColums(data).allEssentials.map((name) => {
                      const found = item.essentials.find(
                        (a) => a.name === name
                      );

                      return (
                        <Td key={name}>
                          {found ? (
                            <EssentialsCheckbox
                              item={item}
                              found={found}
                              onChange={handleChange}
                            />
                          ) : (
                            "—"
                          )}
                        </Td>
                      );
                    })}
                  </tr>
                ))}
                <EmptyRow dispatch={dispatch} data={data} />
              </tbody>
            </Table>
          )}
        </TableWrapper>
      </Container>
    </Section>
  );
};

export default DashboardPage;
