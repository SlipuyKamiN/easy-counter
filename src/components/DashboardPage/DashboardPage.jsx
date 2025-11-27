import { useEffect, useState } from "react";
import {
  BagsNeeded,
  DeleteBtn,
  DirectionBtn,
  DirectionsLink,
  SortBtn,
  Table,
  TableInputWrapper,
  TableWrapper,
  Td,
  Th,
} from "./DashboardPage.styled";
import { API } from "~/API/API";
import { useAPI } from "~/hooks/useAPI";
import { TiDeleteOutline } from "react-icons/ti";
import {
  countBags,
  formatDate,
  getAllColums,
  getRouteLink,
  getSortBy,
} from "~/helpers/dashboard";
import { EmptyRow } from "./EmptyRow";
import { EssentialsCheckbox, TourerSwitcher } from "../Common/Checkboxes";
import { Container, Section } from "../SharedLayout/SharedLayout.styled";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { StateIndicator } from "../Common/StateIndicator";
import { QtyInput } from "../Common/QtyInput";
import { TourDatePicker } from "./TourDatePicker";
import { MdOutlineDirections } from "react-icons/md";

const DashboardPage = () => {
  const [dispatch, data, isLoading, isError] = useAPI(API.getAll);
  const [update] = useAPI(API.update);
  const [deleteRow] = useAPI(API.delete);
  const [sortBy, setSortBy] = useState("id");
  const [selectedAddresses, setSellectedAddresses] = useState([]);

  useEffect(() => {
    if (!data) {
      dispatch();
    }
  }, [dispatch, data]);

  const handleChange = (id, body) => {
    update({ id, body }).then(() => dispatch());
  };

  const selectAddress = (address) => {
    let arr = [];

    if (selectedAddresses.includes(address)) {
      arr = selectedAddresses.filter((a) => a !== address);
      setSellectedAddresses(arr);
    } else {
      arr = [...selectedAddresses, address];
      setSellectedAddresses(arr);
    }

    return;
  };

  return (
    <Section>
      <Container>
        <TableWrapper>
          {data && !isError && (
            <Table>
              <thead>
                <tr>
                  {getAllColums(data).allColumns.map((col, i) => {
                    if (col === "Adresse") {
                      return (
                        <Th key={col} className="sticky top">
                          <DirectionsLink
                            href={getRouteLink(selectedAddresses)}
                            target="_blank"
                            rel="noopener nofollow noreferrer"
                            className={selectedAddresses.length && "active"}
                          >
                            {selectedAddresses.length ? (
                              <>
                                Route planen
                                <MdOutlineDirections size={18} />
                              </>
                            ) : (
                              col
                            )}
                          </DirectionsLink>
                        </Th>
                      );
                    }

                    if (i <= 2) {
                      return (
                        <Th key={col} className="sticky top">
                          <SortBtn type="button" onClick={() => setSortBy(col)}>
                            {col}
                            {sortBy === col && (
                              <FaSortAmountDownAlt size={16} />
                            )}
                          </SortBtn>
                        </Th>
                      );
                    }

                    return (
                      <Th key={col} className="sticky top">
                        {col}
                      </Th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {data.sort(getSortBy(sortBy)).map((item) => (
                  <tr key={item.id}>
                    <Td className="id">
                      <DeleteBtn
                        type="button"
                        onClick={() => {
                          const text = `Do you want to delete this address: ${item.address}?`;
                          if (window.confirm(text)) {
                            deleteRow(item.id).then(dispatch);
                          } else {
                            console.log("Canceled");
                          }
                        }}
                      >
                        {item.id}
                        <span>
                          <TiDeleteOutline size={30} />
                        </span>
                      </DeleteBtn>
                    </Td>
                    <Td className="sticky left">
                      <DirectionBtn
                        className={
                          selectedAddresses.includes(item.address) && "selected"
                        }
                        onClick={() => {
                          selectAddress(item.address);
                        }}
                      >
                        {item.address}
                      </DirectionBtn>
                    </Td>
                    <Td>
                      <TourDatePicker item={item} handleChange={handleChange} />
                    </Td>
                    <Td>
                      <TourerSwitcher
                        onChange={() =>
                          handleChange(item.id, {
                            ...item,
                            pickupNeeded: !item.pickupNeeded,
                          })
                        }
                        item={item}
                      />
                    </Td>
                    <Td>
                      <BagsNeeded>{countBags(item)}</BagsNeeded>
                      {item.updatedAt && (
                        <span>{formatDate(item.updatedAt)}</span>
                      )}
                    </Td>
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
      <StateIndicator
        isError={isError}
        isLoading={isLoading}
        success={data}
        fixed
      />
    </Section>
  );
};

export default DashboardPage;
