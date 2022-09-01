
/*Active Links
Check this out, as the user types:

setSearchParams() is putting the ?filter=... search params in the URL and rerendering the router.
useSearchParams is now returning a URLSearchParams with "filter" as one of its values.
We set the value of the input to whatever is in the filter search param (it's just like useState but in the URLSearchParams instead!)
We filter our list of invoices based on the filter search param.
*/
import { NavLink, Outlet,
  useSearchParams,useLocation } from "react-router-dom";
import { getInvoices } from "../data";

  /*
Custom Behavior
If you filter the list and then click a link, you'll notice that the list is no longer filtered and the search param is cleared from the <input> and the URL. You might want this, you might not! Maybe you want to keep the list filtered and keep the param in the URL.

We can persist the query string when we click a link by adding it to the link's href. We'll do that by composing NavLink and useLocation from React Router into our own QueryNavLink (maybe there's a better name, but that's what we're going with today).
  */

export default function Invoices() {
  let invoices = getInvoices();
  let [searchParams, setSearchParams] = useSearchParams();

  function QueryNavLink({ to, ...props }) {
    let location = useLocation();
    return <NavLink to={to + location.search} {...props} />;
  }
  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
                <input
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
        {invoices
          .filter((invoice) => {
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let name = invoice.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((invoice) => (
            <NavLink
              style={({ isActive }) => ({
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
              })}
              to={`/invoices/${invoice.number}`}
              key={invoice.number}
            >
              {invoice.name}
            </NavLink>
          ))}
      </nav>
      <Outlet />
    </div>
  );
}