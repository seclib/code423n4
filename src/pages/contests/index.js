import React from "react";
import { graphql } from "gatsby";
import DefaultLayout from "../../layouts/DefaultLayout";
import ContestList from "../../components/ContestList";
import { contestsByState } from "../../utils/filter";

export default function Contests({ data }) {
  const contests = data.contests.edges;

  const filteredContests = contestsByState({ contests });
  console.log(JSON.stringify(filteredContests));

  return (
    <DefaultLayout pageTitle="Contests" bodyClass="contests-page">
      <div className="wrapper-main">
        {filteredContests.active ? (
          <section>
            <h1>Active contests</h1>
            <ContestList contests={filteredContests.active} />
          </section>
        ) : (
          ""
        )}
        {filteredContests.soon ? (
          <section>
            <h1>Upcoming contests</h1>
            <ContestList contests={filteredContests.soon} />
          </section>
        ) : (
          ""
        )}
        {filteredContests.completed ? (
          <section>
            <h1>Completed contests</h1>
            <ContestList contests={filteredContests.completed} />
          </section>
        ) : (
          ""
        )}
      </div>
    </DefaultLayout>
  );
}

export const query = graphql`
  query {
    contests: allContestsCsv(sort: { fields: end_time, order: ASC }) {
      edges {
        node {
          id
          title
          details
          hide
          league
          start_time
          end_time
          amount
          repo
          findingsRepo
          sponsor {
            name
            image {
              childImageSharp {
                resize(width: 160) {
                  src
                }
              }
            }
            link
          }
          fields {
            submissionPath
            contestPath
          }
        }
      }
    }
  }
`;
