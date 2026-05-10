# The Flow: "The Commuter’s Journey"

We are going to focus on a single, high-quality flow. We call this a "Happy Path" test.

| Step | Interaction | Pro SDET Tip |
| :--- | :--- | :--- |
| **Search** | Enter "Hyderabad" to "Bangalore". | Don't just type; wait for the suggested city list to appear and click the first option. |

| **Calendar** | Pick a date 2 days from today. | **The Challenge:** Don't hardcode "25th." Write a small helper function that calculates "Today + 2 days" so the test never expires. |

| **Filter** | Select "Sleeper" and "AC". | Use Playwright’s `locator.filter()` to find these buttons easily. |

| **Selection** | Click "View Seats" and pick an available seat. | Redbus uses a Canvas or complex HTML for seats. This is where you show off your Debugging skills. |