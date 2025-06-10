/**
 * Opens a URL in either the current tab or a new tab.
 *
 * - Opens the URL in the current tab hrefTo('https://example.com');
 * - Opens the URL in a new tab hrefTo('https://example.com', true);
 */
export function hrefTo(href: string, newTab: boolean = false) {
  window.open(href, newTab ? '_blank' : undefined)
}

/**
 * Delays execution for a specified number of milliseconds.
 *
 * This function returns a Promise that resolves after the specified delay.
 * It can be used to create a delay in asynchronous functions.
 */
export function delay(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

/**
 * Copies the provided text to the clipboard.
 *
 * This function uses the Clipboard API to copy the given text to the user's clipboard.
 * It works in modern browsers that support the Clipboard API.
 */
export async function copyToClipboard(text: string): Promise<void> {
  if (!navigator.clipboard) {
    return
  }

  try {
    await navigator.clipboard.writeText(text)
  } catch (error) {
    if (import.meta.env.VITE_ENVIRONMENT === 'development') {
      console.error(error);
    }
  }
}

export function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function formatWaktuRelative(date: Date) {
  const now = new Date()
  const past = new Date(date)
  const diff = (now.getTime() - past.getTime()) / 1000 // in seconds

  if (diff < 60) return 'baru saja'
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`
  if (diff < 2592000) return `${Math.floor(diff / 86400)} hari lalu`

  return past.toLocaleDateString() // fallback: "dd/mm/yyyy"
}

// export function exportData(title: string, data: Array<any>) {
//  const appStore = useAppStore();
//  const jsonData = JSON.stringify(data);

//  const blob = new Blob([jsonData], { type: 'application/json' });
//  const url = URL.createObjectURL(blob);
//  const a = document.createElement('a');

//  const fileName = `${title}-${new Date().toLocaleDateString('id', { dateStyle: 'full' })}.json`;
//  a.href = url;
//  a.download = fileName;
//  document.body.appendChild(a);

//  a.click();
//  document.body.removeChild(a);

//  URL.revokeObjectURL(url);

//  appStore.setAlerts(
//   'success',
//   'Export Successful',
//   `Your data has been successfully exported as a JSON file. The file named "${fileName}" has been prepared for download.`
//  );
// }

// export function importData() {
//  const input = document.createElement('input');
//  input.type = 'file';
//  input.accept = '.json';
//  input.style.display = 'none';
//  input.multiple = true;

//  document.body.appendChild(input);

//  input.addEventListener('change', async (event) => {
//   if (event.target) {
//    const appStore = useAppStore();
//    const input = event.target as HTMLInputElement;
//    const files = input.files;

//    if (files) {
//     for (const file of files) {
//      const productsRegex = /^Products-.*\.json$/;
//      const incomesRegex = /^Incomes-.*\.json$/;

//      if (productsRegex.test(file.name) || incomesRegex.test(file.name)) {
//       try {
//        const text = await file.text();
//        const jsonData = JSON.parse(text);

//        if (productsRegex.test(file.name)) {
//         const productStore = useProductStore();
//         productStore.products = jsonData;
//         appStore.setAlerts(
//          'success',
//          'Import Successful',
//          'The products data has been successfully imported.'
//         );
//        } else if (incomesRegex.test(file.name)) {
//         const incomeStore = useIncomeStore();
//         incomeStore.incomes = jsonData;
//         appStore.setAlerts(
//          'success',
//          'Import Successful',
//          'The incomes data has been successfully imported.'
//         );
//        }
//       } catch (error) {
//        appStore.setAlerts(
//         'error',
//         'Import Failed',
//         'There was an error processing the file.'
//        );
//       }
//      } else {
//       appStore.setAlerts(
//        'error',
//        'Import Failed',
//        'The selected file does not match the required format.'
//       );
//      }
//     }
//    }

//    document.body.removeChild(input);
//   }
//  });

//  input.click();
// }
