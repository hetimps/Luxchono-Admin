import dayjs from 'dayjs';
import React from 'react';

export const BASE_URL = "http://157.230.61.208:5757"

export const prepareHeaders = (headers: any) => {
  const token = localStorage.getItem("token");
  console.log(token)
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
};

interface Column {
  id: string;
  label: string;
}

// export const exportToCsv = (rows: any[] | null, columns: Column[], fileName: string): void => {
//   if (!rows) {
//     return;
//   }
//   const csvData = rows.map(row => columns.map(col => row[col.id]).join(',')).join('\n');
//   const csvContent = `${columns.map(col => col.label).join(',')}\n${csvData}`;
//   const blob = new Blob([csvContent], { type: 'text/csv' });
//   const link = document.createElement('a');
//   link.href = URL.createObjectURL(blob);
//   link.download = `${fileName}.csv`;
//   link.click();
// };


export const exportToCsv = (rows: any[] | null, columns: Column[], fileName: string): void => {
  if (!rows) {
    return;
  }

  // Format createdAt and totalAmt fields before exporting
  const formattedRows = rows.map(row => ({
    ...row,
    createdAt: dayjs(row.createdAt).format('MMM - DD - YYYY [at] hh:mm A'),
  }));

  const csvData = formattedRows.map(row => columns.map(col => row[col.id]).join(',')).join('\n');
  const csvContent = `${columns.map(col => col.label).join(',')}\n${csvData}`;
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.csv`;
  link.click();
};

// export const exportToExcel = (rows: any[] | null, columns: Column[], fileName: string): void => {
//   if (!rows) {
//     return;
//   }

//   const ws = XLSX.utils.json_to_sheet(rows.map(row => {
//     const rowData: { [key: string]: any } = {};
//     columns.forEach(col => {
//       rowData[col.id] = row[col.id];
//     });
//     return rowData;
//   }));

//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
//   XLSX.writeFile(wb, `${fileName}.xlsx`);
// };



export const useOutsideAlerter = (ref: any, setShowDateRangePicker: any) => {
  React.useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowDateRangePicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setShowDateRangePicker]);
};