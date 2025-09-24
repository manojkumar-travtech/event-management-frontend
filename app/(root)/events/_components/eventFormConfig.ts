export const createEventConfig = {
  title: "Create Event",
  description: "Fill in the details below to create the event.",
  showProgress: false,
  fullWidthButtons: true,
  gridCols: 2, // 2-column grid
  sections: [
    {
      title: "",
      collapsible: false,
      fields: [
        {
          name: "company",
          label: "Company",
          type: "select", // dropdown
          placeholder: "Choose company",
          options: [
            { label: "ABC Corp", value: "abc_corp" },
            { label: "XYZ Ltd", value: "xyz_ltd" },
            { label: "MegaTech", value: "megatech" },
          ],
          validation: { required: "Company is required" },
        },
        {
          name: "clientCompany",
          label: "Client Company",
          type: "multiselect", // dropdown
          placeholder: "Choose company",
          options: [
            { label: "Client A", value: "client_a" },
            { label: "Client B", value: "client_b" },
            { label: "Client C", value: "client_c" },
          ],
        },
      ],
    },
    {
      title: "(Choose one event admin)",
      collapsible: false,
      fields: [
        {
          name: "eventAdmin",
          label: "Event Admin",
          type: "select",
          placeholder: "Choose event admin",
          options: [
            { label: "Alice Johnson", value: "alice_johnson" },
            { label: "Bob Smith", value: "bob_smith" },
            { label: "Carol White", value: "carol_white" },
          ],
          validation: { required: "Event Admin is required" },
        },
        {
          name: "eventCoordinator",
          label: "Event Coordinator",
          type: "select",
          placeholder: "Choose event coordinator",
          options: [
            { label: "David Lee", value: "david_lee" },
            { label: "Eva Green", value: "eva_green" },
            { label: "Frank Moore", value: "frank_moore" },
          ],
        },
        {
          name: "sendAllRequestsToCoordinator",
          label: "Send All Requests to Event Coordinator",
          type: "checkbox",
          colSpan: 2,
        },
      ],
    },
    {
      title: "Event Details",
      collapsible: false,
      fields: [
        {
          name: "eventName",
          label: "Event Name",
          type: "text",
          placeholder: "Event Name",
          colSpan: 2,
          validation: { required: "Event Name is required" },
        },
        {
          name: "eventStartDate",
          label: "Event Start Date",
          type: "date",
          validation: { required: "Start Date is required" },
        },
        {
          name: "eventEndDate",
          label: "Event End Date",
          type: "date",
          validation: { required: "End Date is required" },
        },
        {
          name: "startTime",
          label: "Start Time",
          type: "time",
        },
        {
          name: "airportCode",
          label: "Airport Code",
          type: "select",
          placeholder: "Choose the airport code",
          options: [
            { label: "JFK", value: "JFK" },
            { label: "LAX", value: "LAX" },
            { label: "ORD", value: "ORD" },
          ],
        },
        {
          name: "address",
          label: "Address/Venue",
          type: "text",
          placeholder: "Location",
          colSpan: 2,
        },
      ],
    },
    {
      title: "Restrictions",
      collapsible: false,
      fields: [
        {
          name: "earliestDepartureDate",
          label: "Earliest Departure Date",
          type: "date",
        },
        {
          name: "latestReturnDate",
          label: "Latest Return Date",
          type: "date",
        },
        {
          name: "airlinesToAvoid",
          label: "Airlines To Avoid",
          type: "select",
          placeholder: "Select...",
          multiple: true,
          options: [
            { label: "Delta", value: "delta" },
            { label: "American Airlines", value: "aa" },
            { label: "United", value: "united" },
          ],
        },
      ],
    },
  ],
};

export const additionalFormConfig = {
  title: "Event Settings",
  description: "Configure additional event settings and preferences.",
  showProgress: false,
  fullWidthButtons: true,
  gridCols: 2,
  sections: [
    {
      title: "Communication Settings",
      collapsible: false,
      fields: [
        {
          name: "emailNotifications",
          label: "Email Notifications",
          type: "checkbox",
        },
        {
          name: "smsNotifications",
          label: "SMS Notifications",
          type: "checkbox",
        },
        {
          name: "reminderDays",
          label: "Reminder Days Before Event",
          type: "select",
          placeholder: "Select days",
          options: [
            { label: "1 Day", value: "1" },
            { label: "3 Days", value: "3" },
            { label: "7 Days", value: "7" },
            { label: "14 Days", value: "14" },
          ],
          validation: { required: "End Date is required" },
        },
        {
          name: "reminderTime",
          label: "Reminder Time",
          type: "select",
          placeholder: "Select time",
          options: [
            { label: "Morning", value: "morning" },
            { label: "Afternoon", value: "afternoon" },
            { label: "Evening", value: "evening" },
          ],
          conditional: {
            field: "reminderDays",
            value: ["1", "3", "7", "14"],
          },
          validation: { required: "reminderTime is required" },
        },
        {
          name: "maxAttendees",
          label: "Maximum Attendees",
          type: "text",
          placeholder: "Enter number",
        },
      ],
    },
  ],
};
