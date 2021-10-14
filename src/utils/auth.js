import { authMap } from "config/authMap";

export function formatAuths(auths = []) {
  const sidebar = [];
  const actions = [];
  const sideRe = /^sidebar_/;
  const actionRe = /^action_/;
  const authsSet = new Set(auths);

  for (let [resource, vals = []] of authMap.entries()) {
    if (sideRe.test(resource)) {
      const valSet = new Set(vals);
      const intersect = new Set([...authsSet].filter(x => valSet.has(x)));

      if (intersect.size > 0 || vals.includes("*")) {
        const path = resource.split("sidebar_")[1];
        sidebar.push(path);
      }
    }

    if (actionRe.test(resource)) {
      const valSet = new Set(vals);
      const intersect = new Set([...authsSet].filter(x => valSet.has(x)));

      if (intersect.size > 0 || vals.includes("*")) {
        actions.push(resource);
      }
    }
  }

  return { sidebar, actions };
}
