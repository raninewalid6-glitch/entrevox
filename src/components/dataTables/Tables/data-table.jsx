"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

import { Input } from "../../ui/input";
import { useLocation } from "react-router-dom";
import { Button } from "../../ui/button";
import { FileUp } from "lucide-react";
import * as XLSX from "xlsx";

// Variantes possibles pour agent et telephone selon les APIs
const AGENT_VARIANTS = ["agent", "Agent", "AGENT", "createdBy", "created_by"];
const TELEPHONE_VARIANTS = [
  "telephone",
  "Telephone",
  "TELEPHONE",
  "phone",
  "tel",
  "numero_telephone",
  "contact",
];

function findColumn(table, variants) {
  const allColumns = table.getAllLeafColumns();
  for (const key of variants) {
    const col = allColumns.find((c) => c.id === key);
    if (col) return col;
  }
  return null;
}

export function DataTable({ columns, data, TypeFilter, DateFilter }) {
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  const location = useLocation();
  const path = location.pathname;

  const exportToExcel = () => {
    const exportData = table.getRowModel().rows.map((row) =>
      row.getVisibleCells().reduce((acc, cell) => {
        acc[cell.column.id] = cell.getContext().getValue();
        return acc;
      }, {}),
    );
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);
    XLSX.utils.book_append_sheet(wb, ws, "Rapports");
    XLSX.writeFile(wb, "Rapports.xlsx");
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      pagination: { pageIndex, pageSize },
    },
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(newState.pageIndex);
      setPageSize(newState.pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Auto-détection agent et telephone uniquement
  const colAgent = findColumn(table, AGENT_VARIANTS);
  const colTelephone = findColumn(table, TELEPHONE_VARIANTS);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {TypeFilter && (
          <Input
            placeholder="Filtrer par nom..."
            value={table.getColumn(TypeFilter)?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn(TypeFilter)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        )}

        {/* Auto-détecté : fonctionne avec "agent", "Agent", etc. */}
        {colAgent && (
          <Input
            placeholder="Filtrer par agent..."
            value={colAgent.getFilterValue() ?? ""}
            onChange={(e) => colAgent.setFilterValue(e.target.value)}
            className="max-w-sm"
          />
        )}

        {/* Auto-détecté : fonctionne avec "telephone", "Telephone", etc. */}
        {colTelephone && (
          <Input
            placeholder="Filtrer par téléphone..."
            value={colTelephone.getFilterValue() ?? ""}
            onChange={(e) => colTelephone.setFilterValue(e.target.value)}
            className="max-w-sm"
          />
        )}
        

        {/* ===== TOUT CE QUI SUIT EST INCHANGÉ ===== */}

        {path && path === "/Equipe_Qualiter/InformationData" && (
          <Input
            placeholder="Filtrer par Copmagne..."
            value={table.getColumn("type")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("type")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        )}

        {path &&
          (path === "/masse/AGR" ||
            path === "/masse/Aseri" ||
            path === "/masse/purcsa" ||
            path === "/masse/Crec" ||
            path === "/masse/eab" ||
            path === "/masse/freesh" ||
            path === "/masse/pass" ||
            path === "/masse/ps" ||
            path === "/masse/ps" ||
            path === "/masse/freesh" ||
            path === "/Far" ||
            path === "/Signalement") && (
            <Input
              placeholder="Filtrer par date..."
              value={table.getColumn(DateFilter)?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn(DateFilter)?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          )}

        {path && path === "/recherche" && (
          <Input
            placeholder="Filtrer par commande..."
            value={table.getColumn("commande")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("commande")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        )}

        {path && path === "/cartin" && (
          <Input
            placeholder="Filtrer par commande..."
            value={table.getColumn("numero_commande")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table
                .getColumn("numero_commande")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        )}

        {path && path === "/commandeannulerData" && (
          <Input
            placeholder="Filtrer par commande..."
            value={table.getColumn("numero_dj")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("numero_dj")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        )}

        <Button
          className="text-white bg-blue-950 hover:bg-blue/90 duration-300 p-2 w-max flex justify-center items-center space-x-2 rounded-lg cursor-pointer"
          onClick={exportToExcel}
        >
          <FileUp className="" />
          <span>Exportation</span>
        </Button>
      </div>

      {/* Tableau */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-gradient-to-r from-slate-700 to-slate-800 text-xl font-bold text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="border-r last:border-r-0"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="border-r last:border-r-0"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Aucun résultat trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* PAGINATION FIXÉE */}
        <div className="flex items-center justify-end space-x-2 py-4 px-2">
          <div className="flex items-center space-x-2">
            <label htmlFor="rows-per-page" className="text-sm">
              Rows per page:
            </label>
            <select
              id="rows-per-page"
              value={pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="border rounded-md p-1"
            >
              {[10, 20, 30, 40, 50, 100, 200, 500, 1000, 10000].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
