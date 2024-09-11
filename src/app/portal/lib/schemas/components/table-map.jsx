"use client";

import styles from "./table-map.module.scss";
import { camelToReadable } from "@portal/lib/js/camel-to-readable";
const build = (items, _parent_key, update, schema) => {
  console.log(items)
  return (
      <div className={styles['vertical-wrapper']}>
          {Object.keys(items).map((key) => {
              if (key === "_id" || (update && (key === "__v" || key === "createdAt" || key === "updatedAt"))) {
                  return null;
              }
              
              const item = items[key];
              const fullKey = `${_parent_key}${key}::`;

              if (item === null) return null; // Skip null values

              switch (true) {
                  case Array.isArray(item):
                      return (
                          <ArrayComponent
                              key={fullKey}
                              update={update}
                              title={key}
                              _key={fullKey}
                              object={item}
                              schema={schema[key]}
                          />
                      );
                  case typeof item === "object":
                      return (
                          <ObjectComponent
                              key={fullKey}
                              update={update}
                              title={key}
                              _key={fullKey}
                              object={item}
                              schema={schema[key]}
                          />
                      );
                  case typeof item === "boolean":
                      return (
                          <BooleanComponent
                              key={fullKey}
                              update={update}
                              title={key}
                              _key={fullKey}
                              boolean={item}
                          />
                      );
                  case typeof item === "number":
                      return (
                          <NumberComponent
                              key={fullKey}
                              update={update}
                              title={key}
                              _key={fullKey}
                              number={item}
                          />
                      );
                  default:
                      return (
                          <StringComponent
                              key={fullKey}
                              update={update}
                              title={key}
                              _key={fullKey}
                              string={item}
                          />
                      );
              }
          })}
      </div>
  );
};

// Renaming components to start with capital letters
function ArrayComponent({ title, _key, object, update, schema = {} }) {
  return (
      <div className={`${styles.object} ${styles['vertical-wrapper']}`}>
          <div className={styles.title}>{title.match(/0/) ? "" : camelToReadable(title)}</div>
          <div className={`${styles.data} ${styles['vertical-wrapper']}`}>
              {object && object.length > 0 ? (
                  build(object, _key, update, schema)
              ) : (
                  <div className="pt-2">Empty</div>
              )}
              {update && Boolean(schema) && (
                  <div
                      onClick={() => {
                          if (Array.isArray(object)) {
                              update(_key, [...object, schema[0]]);
                          } else if (typeof object === 'object' && object !== null) {
                              update(_key, { ...object, ...schema });
                          } else {
                              update(_key, schema);
                          }
                      }}
                      className={styles.add}
                  >
                      +
                  </div>
              )}
          </div>
      </div>
  );
}

function ObjectComponent({ title, _key, object, update, schema = {} }) {
  return (
      <div className={`${styles.object} ${styles['vertical-wrapper']}`}>
          <div className={`${styles.data} ${styles['vertical-wrapper']}`}>
              {object && Object.keys(object).length > 0 ? (
                  build(object, _key, update, schema)
              ) : (
                  <div className="pt-2">Empty</div>
              )}
          </div>
      </div>
  );
}

function StringComponent({ title, _key, string, update }) {
  return (
      <div className={`${styles.string} ${styles['horizontal-wrapper']}`}>
          <div className={styles.title}>{camelToReadable(title)}</div>
          <div className={styles.data}>
              <input
                  onChange={(ev) => update && update(_key, ev.target.value)}
                  value={string || ''}
              />
          </div>
      </div>
  );
}

function NumberComponent({ title, _key, number, update }) {
  return (
      <div className={`${styles.number} ${styles['horizontal-wrapper']}`}>
          <div className={styles.title}>{camelToReadable(title)}</div>
          <div className={styles.data}>
              <input
                  type="number"
                  onChange={(ev) => update && update(_key, ev.target.value)}
                  value={number}
              />
          </div>
      </div>
  );
}

function BooleanComponent({ title, _key, boolean, update }) {
  return (
      <div className={`${styles.boolean} ${styles['horizontal-wrapper']}`}>
          <div className={styles.title}>{camelToReadable(title)}</div>
          <div className={styles.data}>
              <input
                  type="checkbox"
                  checked={boolean || false}
                  onChange={(ev) => update && update(_key, ev.target.checked)}
              />
          </div>
      </div>
  );
}

export default function TableMap({ data, onUpdate, schema = {} }) {
  return (
      <div className={styles.body}>
          {build(data, "", onUpdate, schema)}
      </div>
  );
}
