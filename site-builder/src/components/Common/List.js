import React from "react";
import { useRouteMatch } from "react-router-dom";
import classNames from "classnames";

const List = ({
  header = "",
  header_class = "",
  container_class = "",
  className = "",
  orientation = "flex-responsive",
  span = null,
  items = [],
  item_class = "",
  footer = "",
  footer_class = "",
}) => {
  const { pathname } = useRouteMatch();
  return (
    <div className={classNames(container_class)}>
      {/* Display The Header*/}
      {header && typeof header === "string" ? (
        <h2 className={classNames(header_class)}>{header}</h2>
      ) : (
        <div className={classNames(header_class)}>{header}</div>
      )}

      {/* Display The List Items */}
      {items.length > 0 && (
        <div
          className={classNames(
            { flex: orientation === "flex-responsive" },
            { grid: orientation === "grid-responsive" },
            {
              [`col-span-${span} grid-cols-${span}`]:
                span !== null && orientation === "grid-responsive",
            },
            { "flex flex-col": orientation === "vertical" },
            className
          )}
        >
          {items.map((item, ind) => {
            const isActive = pathname === item.link;
            return (
              <a href={item.link} key={`drop-down-${item.link}-${ind}`}>
                <div
                  className={classNames(
                    "flex space-x-2 cursor-pointer",
                    { "font-bold": isActive === true },
                    item_class
                  )}
                >
                  {item.icon && (
                    <div
                      className={classNames(
                        "flex justify-center items-center text-gray-500",
                        "rounded-full mr-1 w-5",
                        { "text-dark": isActive === true }
                      )}
                    >
                      {item.icon}
                    </div>
                  )}
                  <p className={"text-sm"}>{item.title}</p>
                </div>
              </a>
            );
          })}
        </div>
      )}

      {/* Display The Footer */}
      {footer && typeof footer === "string" ? (
        <h2 className={classNames(footer_class)}>{footer}</h2>
      ) : (
        <div className={classNames(footer_class)}>{footer}</div>
      )}
    </div>
  );
};

export default List;
