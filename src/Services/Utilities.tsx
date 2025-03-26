const formatDate=(dateString: string)=>{
    const date = new Date(dateString);
    const options={year:'numeric' as const, month:'short' as const};
    return date.toLocaleDateString('en-US', options);
}


const timeAgo = (timestamp: string): string => {
    const now = new Date();
    const postDate = new Date(timestamp);

    // Convert postDate to IST (+5:30 shift)
    const postDateIST = new Date(postDate.getTime() + (330 * 60 * 1000));

    const seconds = Math.floor((now.getTime() - postDateIST.getTime()) / 1000); // Convert to seconds

    if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days !== 1 ? "s" : ""} ago`;

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;

    const months = Math.floor(days / 30.44); // Average month length
    if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;

    const years = Math.floor(days / 365.25); // Consider leap years
    return `${years} year${years !== 1 ? "s" : ""} ago`;
};

// Convert file to Base64
const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};



  // ✅ Create a Date object from the input timestamp
  const convertToIST = (isoString: string): string => {
    if (!isoString) return "Invalid Time";

    // ✅ Convert the stored UTC time to IST (+5:30 shift)
    const utcDate = new Date(isoString);
    const istDate = new Date(utcDate.getTime() + (330 * 60 * 1000)); // Add 5 hours 30 minutes

    return istDate.toLocaleString("en-IN", { 
        hour12: false,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    });
};

const openBase64Resume = (base64String: string, fileType: string = "application/pdf") => {
  try {
      if (!base64String) {
          throw new Error("Base64 string is empty or invalid.");
      }

      // ✅ Remove possible header (e.g., "data:application/pdf;base64,")
      const cleanBase64 = base64String.split(",").pop()?.trim();
      if (!cleanBase64) {
          throw new Error("Invalid Base64 string");
      }

      // ✅ Ensure valid Base64 characters
      const base64Regex = /^[A-Za-z0-9+/=]+$/;
      if (!base64Regex.test(cleanBase64)) {
          throw new Error("Base64 string contains invalid characters.");
      }

      // ✅ Handle missing padding (`=`) at the end
      const padding = cleanBase64.length % 4;
      if (padding > 0) {
          cleanBase64.padEnd(cleanBase64.length + (4 - padding), "=");
      }

      // ✅ Decode Base64 safely
      const byteCharacters = atob(cleanBase64);
      const byteNumbers = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      // ✅ Create a Blob from the decoded data
      const blob = new Blob([byteNumbers], { type: fileType });

      // ✅ Create a URL and open in a new tab
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank");
  } catch (error) {
      console.error("Error decoding Base64: ", error);
  }
};


  const convertToIST1 = (utcDateString: string): string => {
    const utcDate = new Date(utcDateString);

    return utcDate.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, // Ensure AM/PM format
    });
};

  
  
  
export {formatDate,timeAgo,getBase64,convertToIST,openBase64Resume,convertToIST1};
