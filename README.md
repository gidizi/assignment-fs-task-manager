## Client side
### Architecture
The App was design to use react native state as much as possible, and expand it with recoil capabilites only where necessary, with a long distance between 2 components parent (as modal state), or with future vision, when we assume that there is high chance for state reusability across various componenets (task state).
Also, we attempted to minise http calls with expected large payload, therefore after every unsafe http request, we use the reponse object to update the state and stay synced with the server. 

### Http client
Using axios to manage network request, due to its simplicity with defining request infrastructure such as shared base url, and interceptors for future jwt headers automatic forwading. (both unavailable with native fetch api).

### Code reuseability
The prioratise code reusage, keeping dry principle to avoid future error and ease maintanace. i.e shared component for both adding task and editing task, shared modal across the entire project.

### Important missing feature
Sorting and view task features are still missing. Note that we currently show only top number of tasks for convenience. In addition adding loader/s and gracefuly handling errors which are not yet handled gracefuly is highly prioritised


## Server side
### Architecture
The project is written in MVC like architecture, where json http responses are replacing the traditional view component.

MongoDB document database was choosed to manage the data for couple of reasons:
1.Scalability - documentDBs are known for they scaling capabilities.
2.Simpler project initiation - based on the mocked json
3.Mock values didn't contained lookup tables/enums values where expected for fields as priority and status.
This format aligns much better with MongoDb best practices.

## Schema validation
We have decided to combined Mongoose schema validation with zod.
Zod can can enhance validation capabilities for more complex scenarions, but more importantly zod is also a great library for frontend forms schema validation. Using the same validation system minimise potentially errors and contract mismatches.


## Production related notes
1.Creation time currently doesn't support timezones, that is according to the data format provided at the mock.
This could cause inaccuracies when working with teams from different regions.
2.Task owners at the mock doesn't seem to repeat from one task to the other, therefore I kept this field as simple string for now without attempt to manage owner/users or allowing select/autofill at the UI.

## Unfixed bugs/issues
1.MongoDb adds a default attribute of "_id", I couldn't replace it with "id" so far so I decided to just add incrementing "id" field to match the mock, but in practice we use the original "_id" field as identifier and specifically queries identifier.

## Future goals
Using a shared libary for common enums, types, validors(!) and more could be great for contract sync. unfortunately I had some technical issue with setting a monorepo in order to reuse them between server and client.

## Important note
General notes and todo notes are spread around the code. please consider them as "backlog" tasks for a production system.


## App initiation
Download docker desktop (https://www.docker.com/products/docker-desktop/)
download node version 18 or alternatively (recommended) download nvm and run "nvm use" at the projects root

### Server
navigate to the server folder
run "npm run init:local_mongo" to start mongo container
run "npm run start:dev" (production scripts were set but are currently failing)

### client
navigate to the client folder
run "npm run dev" (production scripts were set but are currently failing)


