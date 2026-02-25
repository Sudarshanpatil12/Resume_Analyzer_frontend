import { useAlert } from '../../hooks/useAlert';

function AlertStack() {
  const { alerts, removeAlert } = useAlert();

  return (
    <div className="alert-stack" aria-live="polite" aria-label="Application alerts">
      {alerts.map((alert) => (
        <div key={alert.id} className={`alert-item ${alert.type}`}>
          <p>{alert.message}</p>
          <button type="button" className="alert-close" onClick={() => removeAlert(alert.id)}>
            x
          </button>
        </div>
      ))}
    </div>
  );
}

export default AlertStack;
